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
	iterator: (
		part: any,
		i: number,
		acc: { [key: string]: any }
	) => { [key: string]: any },
	accumulator: {}
) {
	let parts = obj.mimeParts;

	if (parts && parts.length) {
		for (let i = 0; i < parts.length; i++) {
			accumulator = iterator(parts[i], i, accumulator);
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
	return `${origin}/service/home/~/?auth=${
		jwtToken ? 'jwt' : 'co'
	}&id=${encodeURIComponent(messageId || mid)}&part=${encodeURIComponent(
		part
	)}${jwtToken ? `&zjwt=${jwtToken}` : ''}`;
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
	}&id=${encodeURIComponent(profileImageId)}${
		jwtToken ? `&zjwt=${jwtToken}` : ''
	}`;
}

export function normalizeMimeParts(
	message: { [key: string]: any },
	{ origin, jwtToken, isDesktop }: { jwtToken?: string; origin?: string; isDesktop?: string; }
) {
	const processAttachment = ({ ...attachment }) => {
		attachment.messageId = attachment.messageId || message.id;
		attachment.url = getAttachmentUrl(attachment, { origin, jwtToken });
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
				content = part.content || ''; //getPartContent(part);

			// obey scapi's isBody flag:
			if (isBody) acc.body = content;

			// if not explicitly an attachment, discover html/text body:
			if (disposition !== 'attachment') {
				let bodyType =
					type === 'text/html' ? 'html' : type === 'text/plain' && 'text';

				if (
					~type.indexOf('image/') &&
					disposition === 'inline' &&
					!part.contentId
				) {
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
					// Update `text` content so that we stay up-to-date on which CID placeholders were added.
					acc['text'] = (acc['text'] || acc['html'] || '').concat(
						`<br /><div><img src="cid:${attachment.contentId}" /></div><br />`
					);

					acc['html'] = acc['text']; // And then update `html` part so that we render `html` in `viewer`.
				} else if (
					//bodyType can be either 'text/html' or 'text/plain' so to handle such inline attachments the below condition is added
					part.filename &&
					bodyType &&
					disposition === 'inline'
				) {
					(acc['inlineAttachments'] || (acc['inlineAttachments'] = [])).concat(
						processAttachment(part)
					);
				} else if (bodyType && (!acc[bodyType] || disposition !== 'inline')) {
					if ((bodyType === 'html' || bodyType === 'text') && acc[bodyType]) {
						acc[bodyType] = acc[bodyType].concat(content);
					} else {
						acc[bodyType] = content;
					}

					isBody = true;
				}
			}

			// remaining non-body, non-enclosure parts are attachments:
			if (!isBody && type.split('/')[0] !== 'multipart') {
				let mode =
					disposition === 'inline' ? 'inlineAttachments' : 'attachments';

				part.contentType !== 'application/pkcs7-mime' &&
					part.contentType !== 'application/pkcs7-signature' &&
					part.contentType !== 'application/x-pkcs7-signature' &&
					(acc[mode] || (acc[mode] = [])).push(processAttachment(part));

				if (isDesktop) {
					message.attributes = message.attributes || {};
					message.attributes.isEncrypted =
						part.contentType === 'application/pkcs7-mime';
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

	// Some mail clients add contentId and contentLocation to attachment data even though it's not inline attachments
	// we are fixing it here
	// @TODO we should extend this to check if we have any placeholder in body for inline attachments then only consider it as inline attachment
	if (
		message.text &&
		!message.html &&
		message.attachments &&
		message.attachments.some((att: { contentId: any; contentDisposition: any; }) => att.contentId && !att.contentDisposition)
	) {
		message.attachments.forEach((att: { contentId: any; contentLocation: any; }) => {
			delete att.contentId;
			delete att.contentLocation;
		});
	}

	return message;
}
