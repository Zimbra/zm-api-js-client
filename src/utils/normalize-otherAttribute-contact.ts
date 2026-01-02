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
	'workEmail',
	'homeEmail',
	'companyPhone',
	'otherPhone',
	'mobilePhone',
	'homePhone',
	'workPhone',
	'homeFax',
	'workFax',
	'otherFax',
	'pager',
	'imAddress',
	'homeURL',
	'workURL',
	'otherURL',
	'assistantPhone',
	'callbackPhone',
	'carPhone',
	'birthday',
	'anniversary',
	'homeStreet',
	'homeCity',
	'homeState',
	'homePostalCode',
	'homeCountry',
	'workStreet',
	'workCity',
	'workState',
	'workPostalCode',
	'workCountry',
	'otherStreet',
	'otherCity',
	'otherState',
	'otherPostalCode',
	'otherCountry',
	'nickname',
	'jobTitle',
	'company',
	'department',
	'website',
	'notes',
	'image',
	'thumbnailPhoto',
	'userCertificate',
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

// List of all array field names
const ARRAY_FIELDS = [
	'email',
	'workEmail',
	'homeEmail',
	'companyPhone',
	'otherPhone',
	'mobilePhone',
	'homePhone',
	'workPhone',
	'homeFax',
	'workFax',
	'otherFax',
	'pager',
	'imAddress',
	'homeURL',
	'workURL',
	'otherURL',
	'assistantPhone',
	'callbackPhone',
	'carPhone',
	'birthday',
	'anniversary',
	'homeStreet',
	'homeCity',
	'homeState',
	'homePostalCode',
	'homeCountry',
	'workStreet',
	'workCity',
	'workState',
	'workPostalCode',
	'workCountry',
	'otherStreet',
	'otherCity',
	'otherState',
	'otherPostalCode',
	'otherCountry'
];

export function createContactBody(data: any, isDesktop: Boolean) {
	const { attributes, ...rest } = data;
	const contactAttrs = <Object[]>[];

	for (const [key, val] of Object.entries(attributes)) {
		if (key === 'other' && Array.isArray(val)) {
			// Handle 'other' array
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
		} else if (ARRAY_FIELDS.includes(key) && Array.isArray(val)) {
			// Convert array to individual SOAP fields
			// email: ["a", "b", "c"] → email, email2, email3
			val.forEach((fieldValue, index) => {
				if (fieldValue) {
					const fieldKey = index === 0 ? key : `${key}${index + 1}`;
					contactAttrs.push({
						name: fieldKey,
						_content: fieldValue
					});
				}
			});
		} else if (key !== 'other') {
			// Handle regular attributes
			contactAttrs.push({
				name: key,
				[key === 'image' || (!isDesktop && key === 'userCertificate') ? 'aid' : 'content']: val
			});
		}
	}

	return {
		cn: denormalize(ContactInputRequest)({
			...rest,
			attributes: contactAttrs
		})
	};
}

// Normalize individual fields to arrays
export function normalizeOtherAttr(data: any) {
	return data.map((contact: any) => {
		let other: any = [];
		const arrayFields: Record<string, any[]> = {};

		// Initialize all array fields
		ARRAY_FIELDS.forEach(fieldName => {
			arrayFields[fieldName] = [];
		});

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

		// Extract all multi-value fields into arrays
		// email, email2, email3 → email: ["a", "b", "c"]
		ARRAY_FIELDS.forEach(baseFieldName => {
			let fieldIndex = 0;

			while (true) {
				const fieldKey = fieldIndex === 0 ? baseFieldName : `${baseFieldName}${fieldIndex + 1}`;

				if (contact._attrs[fieldKey]) {
					arrayFields[baseFieldName].push(contact._attrs[fieldKey]);
					delete contact._attrs[fieldKey];
					fieldIndex++;
				} else {
					break;
				}
			}
		});

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
				// Add array fields (only if they have values)
				...Object.keys(arrayFields).reduce((acc: Record<string, any>, arrayKey) => {
					if (arrayFields[arrayKey].length > 0) {
						acc[arrayKey] = arrayFields[arrayKey].filter(Boolean);
					}
					return acc;
				}, {}),
				other: (otherAttributewithCustomKey || []).concat(remainingOtherAttribute || [])
			}
		};
	});
}

export function createModifyContactBody(data: any, isDesktop: Boolean) {
	const { changes, ...rest } = data;
	const contactAttrs = <Object[]>[];

	if (Array.isArray(changes)) {
		changes.forEach(({ key, value }) => {
			if (key === 'image' || (!isDesktop && key === 'userCertificate')) {
				contactAttrs.push({
					n: key,
					aid: value
				});
			} else {
				contactAttrs.push({
					n: key,
					_content: value
				});
			}
		});
	}

	return {
		cn: {
			id: rest.id,
			...(rest.folderId && { l: rest.folderId }),
			...(rest.tagNames && { tn: rest.tagNames }),
			a: contactAttrs
		}
	};
}
