import isObject from 'lodash-es/isObject';
import mapValues from 'lodash-es/mapValues';

export function mapValuesDeep(
	obj: {},
	callback: (v: any, k: string) => any
): {} {
	return mapValues(obj, (v, k) => {
		if (Array.isArray(v)) {
			return v.map(v2 => mapValuesDeep(v2, callback));
		} else if (isObject(v)) {
			return mapValuesDeep(v, callback);
		}
		return callback(v, k);
	});
}
