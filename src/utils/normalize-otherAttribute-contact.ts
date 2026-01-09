import { differenceBy } from 'es-toolkit';
import { denormalize } from '../normalize';
import { ContactInputRequest } from '../normalize/entities';

const supportedContactAttributes = [
	'firstName',
	'phoneticFirstName',
	'phoneticCompany',
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
	'thumbnailPhoto',
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

const ignoreAttributes = [
	'modifyTimeStamp',
	'createTimeStamp',
	'zimbraId',
	'objectClass',
	'zimbraMailForwardingAddress',
	'zimbraAccountCalendarUserType',
	'zimbraCalResLocationDisplayName',
	'zimbraCalResType',
	'cardOwner',
	'homeCardMessage',
	'homePhotoURL',
	'workCardMessage',
	'workPhotoURL',
	'firstLast',
	'vcardXProps',
	'imagepart'
];
export function createContactBody(data: any, isDesktop: boolean) {
	const { attributes, ...rest } = data;
	const contactAttrs = <object[]>[];

	for (const [key, val] of Object.entries(attributes)) {
		if (key !== 'other') {
			contactAttrs.push({
				name: key,
				[key === 'image' || (!isDesktop && key === 'userCertificate') ? 'aid' : 'content']: val
			});
		} else if (Array.isArray(val)) {
			for (const otherValue of val) {
				if (
					typeof otherValue === 'object' &&
					otherValue !== null &&
					'key' in otherValue &&
					'value' in otherValue
				) {
					const { key: otherKey, value: otherVal } = otherValue as { key: string; value: unknown };
					contactAttrs.push({
						name: otherKey,
						_content: otherVal
					});
				}
			}
		}
	}
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
			.filter(key => !supportedContactAttributes.includes(key) && !ignoreAttributes.includes(key))
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

		const remainingOtherAttribute = differenceBy(
			other || [],
			otherAttributewithCustomKey || [],
			(item: any) => item.key
		).sort((a: any, b: any) => a.key.localeCompare(b.key));

		return {
			...contact,
			_attrs: {
				...contact._attrs,
				other: (otherAttributewithCustomKey || []).concat(remainingOtherAttribute || [])
			}
		};
	});
}
