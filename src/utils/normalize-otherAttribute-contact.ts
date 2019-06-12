import forEach from 'lodash/forEach';
import { denormalize } from '../normalize';
import { ContactInputRequest } from '../normalize/entities';

export function createContactBody(data: any) {
	const { attributes, ...rest } = data;
	const contactAttrs = <Object[]>[];

	forEach(attributes, (val, key) =>
		key !== 'other'
			? contactAttrs.push({
					name: key,
					[key === 'image' ? 'aid' : 'content']: val
			  })
			: forEach(val, (otherValue: any, index: any) =>
					contactAttrs.push({
						name: 'custom' + (index + 1),
						_content: otherValue
					})
			  )
	);
	return {
		cn: denormalize(ContactInputRequest)({
			...rest,
			attributes: contactAttrs
		})
	};
}

export function normalizeOtherAttr(data: any) {
	return data.map((contact: any) => {
		let other: any = [];

		Object.keys(contact._attrs)
			.filter(key => key.includes('custom'))
			.sort()
			.forEach(
				key => other.push(contact._attrs[key]) && delete contact._attrs[key]
			);
		return {
			...contact,
			_attrs: {
				...contact._attrs,
				other
			}
		};
	});
}
