/** List of content type not show as attachment */
const ignoreContentTypeToShowAsAttachment = [
	'application/pkcs7-signature',
	'application/x-pkcs7-signature',
	'message/delivery-status', // present in Undelivered mail
	'message/disposition-notification', // present in read-receipt response
	'xml/x-zimbra-share' // present in folder share message
];

const MORE_TEXT_TYPES = ['text/rfc822-headers'];

function normalizeCid(cid: string) {
	return cid.replace(/[<>]/g, '');
}

/** Normalize a Content-Type to include only `type/subtype`. */
function normalizeType(contentType: string) {
	return String(contentType)
		.replace(/^\s*(.*?)\s*;.+$/i, '$1')
		.toLowerCase();
}

function normalizeDisposition(contentDisposition: string) {
	return normalizeType(contentDisposition);
}

/** reduce()-like iteration over nested MIME parts */
function reduceMimeParts(
	obj: any,
	iterator: (part: any, i: number, acc: { [key: string]: any }) => { [key: string]: any },
	accumulator: {}
) {
	let parts = obj.mimeParts;

	if (parts && parts.length) {
		for (let i = 0; i < parts.length; i++) {
			accumulator = iterator(parts[i], i, accumulator);
			if (parts[i].contentType !== 'message/rfc822')
				reduceMimeParts(parts[i], iterator, accumulator);
		}
	}

	return accumulator;
}
export function getAttachmentUrl(
	attachment: { [key: string]: any },
	{ origin = '', jwtToken }: { jwtToken?: string; origin?: string }
) {
	let { messageId, mid, part } = attachment;
	return `${origin}/service/home/~/?auth=${jwtToken ? 'jwt' : 'co'}&id=${encodeURIComponent(
		messageId || mid
	)}&part=${encodeURIComponent(part)}${jwtToken ? `&zjwt=${jwtToken}` : ''}`;
}

export function getContactProfileImageUrl(
	attachment: { [key: string]: any },
	{ origin = '', jwtToken }: { jwtToken?: string; origin?: string }
) {
	const imageURL = getAttachmentUrl(attachment, {
		origin: origin,
		jwtToken: jwtToken
	});
	return imageURL ? `${imageURL}` : '';
}

export function getProfileImageUrl(
	profileImageId: string,
	{ origin = '', jwtToken }: { jwtToken?: string; origin?: string }
) {
	return `${origin}/service/home/~/?max_width=100&max_height=100&auth=${
		jwtToken ? 'jwt' : 'co'
	}&id=${encodeURIComponent(profileImageId)}${jwtToken ? `&zjwt=${jwtToken}` : ''}`;
}

export function normalizeMimeParts(
	message: { [key: string]: any },
	{ origin, jwtToken, isDesktop }: { isDesktop?: string; jwtToken?: string; origin?: string }
) {
	let isMultipartWithInlineImage = false;
	let iosMsgWithImage = '';

	const processAttachment = ({ ...attachment }, forcedContentDisposition?: string) => {
		attachment.messageId = attachment.messageId || message.id;
		attachment.url = getAttachmentUrl(attachment, { origin, jwtToken });

		if (!attachment.contentDisposition) {
			if (forcedContentDisposition === 'attachments') {
				attachment.contentDisposition = 'attachment';
			} else if (forcedContentDisposition === 'inlineAttachments') {
				attachment.contentDisposition === 'inline';
			}
		}

		attachment.contentId = attachment.contentId
			? normalizeCid(attachment.contentId)
			: ~normalizeType(attachment.contentType).indexOf('image/') &&
			  attachment.contentDisposition === 'inline'
			? `AUTO-GEN-CID-${attachment.messageId}-${attachment.part}-${attachment.size}`
			: undefined;

		return attachment;
	};

	reduceMimeParts(
		message,
		(part, _, acc) => {
			let isBody = false,
				type = normalizeType(part.contentType),
				disposition = normalizeDisposition(part.contentDisposition),
				parts = part.mimeParts,
				content = part?.content || ''; //getPartContent(part);

			// obey scapi's isBody flag:
			if (isBody) acc.body = content;

			// for a part of type /image, if its contentId matches with src of an <img /> in text/html part,
			// change its contentDisposition to "inline"
			if (type === 'multipart/related') {
				let htmlPart: any;

				parts.forEach((subpart: any) => {
					// first set the html
					if (subpart.contentType === 'text/html') {
						htmlPart = subpart;
						return;
					}

					// then look for related image parts
					if (
						~subpart.contentType.indexOf('image/') &&
						subpart.contentDisposition === 'attachment' &&
						subpart.contentId &&
						htmlPart?.content
					) {
						// remove angle brackets from <contentId>
						const contentId = subpart.contentId.slice(1, -1);
						const bodyDom = new DOMParser().parseFromString(htmlPart.content, 'text/html');
						const images = bodyDom?.querySelectorAll(`img[src="cid:${contentId}"]`) || [];

						// change disposition to inline
						if (images.length > 0) {
							subpart.contentDisposition = 'inline';
						}
					}
				});
			}

			const isInline = disposition === 'inline';

			// if not explicitly an attachment, discover html/text body:
			if (disposition !== 'attachment') {
				if (isInline && ~type.indexOf('image/') && !part.contentId) {
					/**
					 * Different email clients work in different ways.
					 * E.g. iOS email client doesn't put `contentId` for image inline attachments when there are other type (normal) of attachments as well in email body.
					 * In such cases, iOS email client doesn't even put `image tag placeholders` for inline image attachments.
					 * So, when parsed, ZimbraX don't understand this, so inline images gets vanished.
					 * To fix this, this code block places placeholders with arbitrary CIDs.
					 */
					const attachment = processAttachment(part);

					// Use `text` content, because iOS client always yield `text` part (no `html` part) when multiple attachments are present along with text content.
					// In cases of forwarded msg from iOS client, there wouldn't be `text` part, instead `html` parts.
					// To make sure to include inline image in html content store it in a variable and process later.
					isMultipartWithInlineImage = true;
					iosMsgWithImage = iosMsgWithImage.concat(
						`<br /><div><img src="cid:${attachment.contentId}" /></div><br />`
					);
				} else {
					const isTextType = MORE_TEXT_TYPES.includes(type);
					let bodyType =
						type === 'text/html' ? 'html' : (type === 'text/plain' || isTextType) && 'text';

					if (bodyType) {
						//bodyType can be either 'text/html' or 'text/plain' so to handle such inline attachments the below condition is added
						if (!(part.filename && isTextType && isInline)) {
							isBody = true;
						}
						acc[bodyType] = (acc[bodyType] || '').concat(content);
						iosMsgWithImage = iosMsgWithImage.concat(content);
					}
				}
			}

			// remaining non-body, non-enclosure parts are attachments:
			if (!isBody && type.split('/')[0] !== 'multipart') {
				let mode = isInline ? 'inlineAttachments' : 'attachments';

				!ignoreContentTypeToShowAsAttachment.includes(part.contentType) &&
					(acc[mode] || (acc[mode] = [])).push(processAttachment(part, mode));

				if (isDesktop) {
					message.attributes = message.attributes || {};
					message.attributes.isEncrypted = part.contentType === 'application/pkcs7-mime';
					message.attributes.isSigned =
						part.contentType === 'application/pkcs7-signature' ||
						part.contentType === 'application/x-pkcs7-signature';
				}
			}

			return acc;
		},
		message
	);

	// Default to null if not exist to unset the key if this is an update.
	message.autoSendTime = message.autoSendTime || null;

	// For email sent from ios client or any other email client which may not provide html content and includes inline images,
	// Convert the text part along with inline images into html so that it will be previewed as html content.
	if (isMultipartWithInlineImage) {
		message.html = iosMsgWithImage.replace(/\r\n/g, '<br />');
	}

	// Some mail clients add contentId and contentLocation to attachment data even though it's not inline attachments
	// we are fixing it here
	// @TODO we should extend this to check if we have any placeholder in body for inline attachments then only consider it as inline attachment
	if (
		message.text &&
		!message.html &&
		message.attachments &&
		message.attachments.some(
			(att: { contentDisposition: any; contentId: any }) => att.contentId && !att.contentDisposition
		)
	) {
		message.attachments.forEach((att: { contentId: any; contentLocation: any }) => {
			delete att.contentId;
			delete att.contentLocation;
		});
	}

	return message;
}
