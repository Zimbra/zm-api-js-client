import { objectMapValues } from './utils';

export function mapValuesDeep(obj: {}, callback: (v: any) => any): {} {
	if (typeof obj !== 'object') {
		return callback(obj);
	} else if (Array.isArray(obj)) {
		return obj.map(v => mapValuesDeep(v, callback));
	}

	return objectMapValues(obj, (v: {}) => mapValuesDeep(v, callback));
}
