export function coerceBooleanToString<T>(
	val: boolean | T
): string | boolean | T {
	if (val === true) {
		return 'TRUE';
	}
	if (val === false) {
		return 'FALSE';
	}
	return val;
}

export function coerceStringToBoolean<T>(
	val: string | T
): boolean | string | T {
	if (val === 'TRUE') {
		return true;
	}
	if (val === 'FALSE') {
		return false;
	}
	return val;
}

export function coerceBooleanToInt<T>(val: boolean | T): 0 | 1 | T {
	if (val === true) {
		return 1;
	}
	if (val === false) {
		return 0;
	}
	return val;
}
