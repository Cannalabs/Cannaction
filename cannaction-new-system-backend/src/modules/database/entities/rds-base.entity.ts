export abstract class RDSBase<T> {
	abstract setId(id: T): void;
	abstract getId(): T;

	constructor(options?: Partial<RDSBase<T>>) {
		if (options)
			Object.keys(options).forEach((val) => {
				this[val] = options[val];
			});
	}
}
