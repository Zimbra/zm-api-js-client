import concat from 'lodash/concat';
import differenceBy from 'lodash/differenceBy';
import forEach from 'lodash/forEach';
import { denormalize } from '../normalize';
import { ContactInputRequest } from '../normalize/entities';

const supportedContactAttributes = [
	'firstName',
	'phoneticFirstName',
	'middleName',
	'lastName',
	'phoneticLastName',
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
			: forEach(val, otherValue =>
					contactAttrs.push({
						name: otherValue.key,
						_content: otherValue.value
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

		let castValueOfNickname: any = contact._attrs['nickname'];

		if (castValueOfNickname) {
			// Ideally we shouldn't get the nickname as type of Array as we are not supporting the multiple nicknames
			// this only happens when user import PST using legacy by using tool name Zimbra PST Migration Wizard
			// So, here if nickname is array then use its first element as nickname
			contact._attrs['nickname'] = Array.isArray(castValueOfNickname)
				? castValueOfNickname[0]
				: castValueOfNickname;
		}

		let castValueOfUserCert: any = contact._attrs['userCertificate'];

		if (castValueOfUserCert) {
			// To Do:- Handle multiple UserCertificates for a contact
			contact._attrs['userCertificate'] = Array.isArray(castValueOfUserCert)
				? castValueOfUserCert[0]
				: castValueOfUserCert;
		}

		Object.keys(contact._attrs)
			.filter(key => !supportedContactAttributes.includes(key))
			.forEach(
				key =>
					typeof contact._attrs[key] === 'string' &&
					other.push({ key, value: contact._attrs[key] }) &&
					delete contact._attrs[key]
			);

		const otherAttributewithCustomKey = other
			.filter((o: any) => o.key.match('custom\\d+'))
			.sort(
				(a: any, b: any) => Number(a.key.match(/(\d+)/g)[0]) - Number(b.key.match(/(\d+)/g)[0])
			);

		const remainingOtherAttribute = differenceBy(other, otherAttributewithCustomKey, 'key').sort(
			(a: any, b: any) => a.key.localeCompare(b.key)
		);

		return {
			...contact,
			_attrs: {
				...contact._attrs,
				other: concat(otherAttributewithCustomKey, remainingOtherAttribute)
			}
		};
	});
}
