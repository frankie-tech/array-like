import { ReduceCallback, ReduceValue } from './types';

export default class Arrayish extends Array {
	length: number;
	constructor(
		options: { unique: boolean; returnArr: boolean },
		...items: any[]
	) {
		super();
		this.shift();
		this.options = Arrayish.makeDescriptors(options);
		if (options.unique) {
			let unique = Arrayish.unique(options, ...items);
			this.push(...unique);
		} else {
			// if passed iterable arraylike, needs to iterate through
			// otherwise, just make array
			var makeArr =
				items.length === 1 && items[0].length >= 1 ? items[0] : items;

			this.push(...makeArr);
		}
	}

	// extended from @arr/reduce by lukeed
	reducer(fn: ReduceCallback, val: ReduceValue) {
		var len = this.length;
		if (len === 0) {
			return [];
		}

		var i = 0,
			out = val;

		if (out === void 0) {
			out = this[0];
			i = 1;
		}

		for (; i < len; ) {
			out = fn(out, this[i], i, this);
			i++;
		}

		return out;
	}

	// extended from @arr/map by lukeed
	map(fn: Function, options: { returnArr: boolean }): any[] | Arrayish {
		var len = this.length;
		if (len === 0) {
			return [];
		}

		var i = 0,
			out = new Array(len),
			returnArr =
				Arrayish.hasOption(options, 'returnArr') &&
				options.returnArr === true;

		for (; i < len; ) {
			out[i] = fn(this[i], i, this);
			i++;
		}

		return returnArr
			? out
			: new Arrayish({ unique: false, returnArr: false }, out);
	}

	forEach(fn: Function) {
		var i = 0,
			len = this.length;
		for (; i < len; ) {
			fn(this[i], i, this);
			i++;
		}
	}

	async asyncEach(fn: Function) {
		var i = 0,
			len = this.length;
		for (; i < len; ) {
			await fn(this[i], i, this);
			i++;
		}
	}

	toArray(iterable: any): Arrayish {
		var iterArr = Array.prototype.slice.call(iterable),
			l = iterArr.length,
			i = 0;
		for (; l > i; i++) {
			let item = iterArr[i];
			Arrayish.isIterable(item) ? this.push(...item) : this.push(item);
		}
		return this;
	}

	static unique(
		options: { returnArr: boolean },
		...items: any[]
	): any[] | Arrayish {
		var arr = Array.prototype.slice.call(items),
			l = arr.length,
			i = 0,
			out = [];

		for (; l > i; ) {
			if (arr.indexOf(arr[i]) !== i) {
				i++;
				continue;
			}
			out.push(arr[i]);
			i++;
		}

		return options.returnArr
			? out
			: new Arrayish({ unique: false, returnArr: false }, ...out);
	}

	static type(obj: any): string {
		// returns type as a string: array, object, symbol, string, etc...
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	set options(options: PropertyDescriptor[]) {
		const [k, v] = options.map(option => Object.entries(option));

		const config = Object.assign(
			{},
			Object.getOwnPropertyDescriptor(this, 'config'),
			{
				value: {
					[`${k}`]: v,
				},
			}
		);
		Object.defineProperties(this, {
			config,
		});
	}

	/* 
	 TODO: I want to make the options accessible at some point, but for now, I'm not sure how to do that keep typescript happy
	get options() {
		const descriptors = Object.getOwnPropertyDescriptors(this);

		return {
			...descriptors
		};
	}
	*/

	get last() {
		return this[this.length - 1];
	}

	static get [Symbol.species]() {
		return Array;
	}

	static makeDescriptors(options: { unique: boolean; returnArr: boolean }) {
		const descriptorDefault = {
			configurable: true,
			enumerable: true,
			writable: true,
		};
		const descriptors = Object.entries(options).map(([k, v]) =>
			Object.assign(descriptorDefault, {
				value: {
					[`${k}`]: v,
				},
			})
		);
		return descriptors;
	}

	static isIterable(iterable: any): boolean {
		return iterable && iterable[Symbol.iterator] instanceof Function;
	}

	static hasOption(obj: {}, option: string) {
		return this.type(obj) === 'object' && option in obj;
	}
}
