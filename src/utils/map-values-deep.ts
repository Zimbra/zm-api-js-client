import { mapValues } from 'es-toolkit';

export function mapValuesDeep(obj: {}, callback: (v: any) => any): {} {
	if (obj === null || typeof obj !== 'object') {
		return callback(obj);
	} else if (Array.isArray(obj)) {
		return obj.map(v => mapValuesDeep(v, callback));
	}
	return mapValues(obj, v => mapValuesDeep(v, callback));
}

export function getValueByPath(obj: any, path: string): any {
	if (!path) return undefined;

	return path
		.split('.')
		.reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), obj);
}
