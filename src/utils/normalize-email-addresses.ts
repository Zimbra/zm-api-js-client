enum Mapping {
	f = 'from',
	t = 'to',
	c = 'cc',
	b = 'bcc',
	s = 'sender'
}

export function parseAddress(address: string) {
	if (typeof address === 'string') {
		let parts = address.match(/(['"])(.*?)\1\s*<(.+)>/);
		if (parts) {
			return { address: parts[3], name: parts[2] };
		}
		return { address };
	}
	return address;
}

export function normalizeEmailAddresses(message: { [key: string]: any }) {
	if (!message.emailAddresses) {
		return message;
	}

	for (let i = 0; i < message.emailAddresses.length; i++) {
		let sender = message.emailAddresses[i],
			type: keyof typeof Mapping = sender.type,
			key = Mapping[type];
		(message[key] || (message[key] = [])).push(parseAddress(sender));
	}

	return message;
}
