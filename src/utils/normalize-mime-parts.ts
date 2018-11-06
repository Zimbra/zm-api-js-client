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

export function getProfileImageUrl(
	profileImageId: string,
	{ origin = '', jwtToken }: { jwtToken?: string; origin?: string }
) {
	return `${origin}/service/home/~/?auth=${
		jwtToken ? 'jwt' : 'co'
	}&id=${encodeURIComponent(profileImageId)}&t=${Date.now()}${jwtToken ? `&zjwt=${jwtToken}` : ''}`;
}

export function normalizeMimeParts(
	message: { [key: string]: any },
	{ origin, jwtToken }: { jwtToken?: string; origin?: string }
) {
	const processAttachment = ({ ...attachment }) => {
		attachment.messageId = attachment.messageId || message.id;
		attachment.url = getAttachmentUrl(attachment, { origin, jwtToken });
		if (attachment.contentId) {
			attachment.contentId = normalizeCid(attachment.contentId);
		}
		return attachment;
	};

	reduceMimeParts(
		message,
		(part, _, acc) => {
			let isBody = false,
				type = normalizeType(part.contentType),
				disposition = normalizeDisposition(part.contentDisposition),
				content = part.content; //getPartContent(part);

			// obey scapi's isBody flag:
			if (isBody) acc.body = content;

			// if not explicitly an attachment, discover html/text body:
			if (disposition !== 'attachment') {
				let bodyType =
					type === 'text/html' ? 'html' : type === 'text/plain' && 'text';
				if (bodyType && (!acc[bodyType] || disposition !== 'inline')) {
					acc[bodyType] = content;
					isBody = true;
				}
			}

			// remaining non-body, non-enclosure parts are attachments:
			if (!isBody && type.split('/')[0] !== 'multipart') {
				let mode =
					disposition === 'inline' ? 'inlineAttachments' : 'attachments';

				part.contentType !== 'application/pkcs7-mime' &&
					part.contentType !== 'application/pkcs7-signature' &&
					(acc[mode] || (acc[mode] = [])).push(processAttachment(part));
			}

			return acc;
		},
		message
	);

	// Default to null if not exist to unset the key if this is an update.
	message.autoSendTime = message.autoSendTime || null;

	return message;
}
