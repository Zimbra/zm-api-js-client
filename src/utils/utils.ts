export function castArray(value: any): Array<any> {
	return Array.isArray(value) ? value : [value];
}

export function isError(value: any): Boolean {
	const type = Object.prototype.toString.call(value);
	return type === '[object Error]';
}

export function objectMapValues(
	obj: Record<string, any>,
	iteratee: (value: any, key: string, obj: Record<string, any>) => any
): Record<string, any> {
	const result: Record<string, any> = {};

	Object.keys(obj).forEach(key => {
		result[key] = iteratee(obj[key], key, obj);
	});

	return result;
}

export function objectReduce(
	obj: Record<string, any>,
	iteratee: (result: any, value: any, key: string, obj: Record<string, any>) => any,
	initialValue: any
): any {
	return Object.keys(obj).reduce((result, key) => {
		return iteratee(result, obj[key as keyof object], key, obj);
	}, initialValue);
}

export function objectForEach(
	obj: Record<string, any>,
	iteratee: (value: any, key: string, obj: Record<string, any>) => void
): void {
	return Object.keys(obj).forEach(key => {
		iteratee(obj[key], key, obj);
	});
}

export function arrayDifferenceBy(array1: Array<any>, array2: Array<any>, key: string): Array<any> {
	return array1.filter(a => !array2.some(b => b[key] === a[key]));
}
