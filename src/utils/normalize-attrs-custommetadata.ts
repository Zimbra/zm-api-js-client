export function setCustomMetaDataBody(data: any) {
	const { attrs, id, section } = data;
	const customMetaAttrs: Object[] = [];

	for (const { key, value } of attrs) {
		customMetaAttrs.push({
			[key]: value
		});
	}

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

	Object.keys(data._attrs).forEach(
		key => typeof data._attrs[key] === 'string' && attrs.push({ key, value: data._attrs[key] })
	);
	return {
		...data,
		_attrs: attrs
	};
}

export function normalizeHeaderAttrs(data: any) {
	let attrs: any = [];

	Object.keys(data).forEach(
		key => typeof data[key] === 'string' && attrs.push({ key, value: data[key] })
	);
	return attrs;
}
