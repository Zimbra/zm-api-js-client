import { objectForEach } from './utils';

export function setCustomMetaDataBody(data: any) {
	const { attrs, id, section } = data;
	const customMetaAttrs = <Object[]>[];

	objectForEach(attrs, (value, key) =>
		customMetaAttrs.push({
			[key]: value
		})
	);

	return {
		id,
		meta: {
			section,
			_attrs: customMetaAttrs
		}
	};
}

export function normalizeCustomMetaDataAttrs(data: any) {
	let attrs: any = [];

	objectForEach(data._attrs, (value, key) => {
		if (typeof data._attrs[key] === 'string') {
			attrs.push({ key, value });
		}
	});

	return {
		...data,
		_attrs: attrs
	};
}
