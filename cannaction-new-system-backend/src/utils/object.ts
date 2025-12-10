export function mergeUndefinedFields<T>(savedObject: T, originalObject: T) {
	Object.keys(originalObject).forEach((key) => {
		if (!savedObject[key]) savedObject[key] = originalObject[key];
	});
	return savedObject;
}

export function safeConstructor<T>(
	objectType: new (...args) => T,
	id?: unknown | null
): T | undefined | null {
	if (typeof id === 'undefined' || id === '' || id === 0 || id === '0')
		return undefined;
	if (id === null) return null;
	return new objectType({ id: id });
}
