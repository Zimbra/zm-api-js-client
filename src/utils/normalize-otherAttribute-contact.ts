import forEach from 'lodash/forEach';
import { denormalize } from '../normalize';
import { ContactInputRequest } from '../normalize/entities';

const supportedContactAttributes = [
	'firstName',
	'middleName',
	'lastName',
	'fullName',
	'maidenName',
	'namePrefix',
	'nameSuffix',
	'email',
	'email2',
	'workEmail',
	'workEmail2',
	'homeEmail',
	'homeEmail2',
	'phone',
	'phone2',
	'companyPhone',
	'companyPhone2',
	'otherPhone',
	'otherPhone2',
	'mobilePhone',
	'mobilePhone2',
	'homePhone',
	'homePhone2',
	'workPhone',
	'workPhone2',
	'pager',
	'pager2',
	'homeFax',
	'homeFax2',
	'workFax',
	'workFax2',
	'imAddress',
	'imAddress1',
	'imAddress2',
	'imAddress3',
	'imAddress4',
	'imAddress5',
	'nickname',
	'homeStreet',
	'homeCity',
	'homeState',
	'homePostalCode',
	'homeCountry',
	'homeURL',
	'workStreet',
	'workCity',
	'workState',
	'workPostalCode',
	'workCountry',
	'workURL',
	'jobTitle',
	'company',
	'department',
	'birthday',
	'anniversary',
	'website',
	'notes',
	'image',
	'userCertificate',
	'assistantPhone',
	'callbackPhone',
	'carPhone',
	'otherCity',
	'otherCountry',
	'otherFax',
	'otherPostalCode',
	'otherState',
	'otherStreet',
	'otherURL',
	'fileAs',
	'type'
];
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
			.filter(key => !supportedContactAttributes.includes(key))
			.sort()
			.forEach(
				key =>
					other.push({ key, value: contact._attrs[key] }) &&
					delete contact._attrs[key]
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
