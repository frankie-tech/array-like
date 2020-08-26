export default class Arrayish extends Array {
	length: number;
	constructor(options: { unique: boolean }, ...items: any[]) {
		super();
		this.shift();
		if (options.unique) {
			this.toArray(Arrayish.unique({ returnArr: false }, items));
			this.shift();
		} else {
			// if passed iterable arraylike, needs to iterate through
			// otherwise, just make array
			var makeArr =
				arguments.length === 1 && arguments[0].length >= 1
					? arguments[0]
					: arguments;
			this.toArray(makeArr);
		}
	}

	// extended from @arr/reduce by lukeed
	reduce(fn: ReduceCallback, val: ReduceValue) {
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
	map(fn: Function, options: { returnArr: boolean }): any[] | Arrayish<any> {
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

		return returnArr ? out : new Arrayish({ unique: false }, out);
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

	isIterable(iterable: any) {
		return iterable && iterable[Symbol.iterator] instanceof Function;
	}

	toArray(iterable: any) {
		var isIterable = this.isIterable(iterable);

		if (isIterable && iterable.length >= 1) {
			var iterArr = Array.prototype.slice.call(iterable),
				l = iterArr.length,
				i = 0;
			for (; l > i; ) {
				if (this.isIterable(iterArr[i])) {
					this.push(...iterArr[i++]);
					continue;
				}
				this.push(iterArr[i++]);
			}
			return this;
		}
		return this.push(iterArr);
	}

	static unique(options: { returnArr: boolean }, ...items: any[]) {
		var arr = Array.prototype.slice.call(arguments),
			l = arr.length,
			i = 0,
			out = [],
			returnArr =
				this.hasOption(options, 'returnArr') &&
				options.returnArr === true;
		if (returnArr) arr = Array.prototype.slice.call(items);

		for (; l > i; ) {
			if (arr.indexOf(arr[i]) !== i) {
				i++;
				continue;
			}
			out.push(arr[i]);
			i++;
		}
		return returnArr ? out : new Arrayish({ unique: false }, out);
	}

	static type(obj) {
		// returns type: array, object, symbol, string, etc...
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	get last() {
		return this[this.length - 1];
	}

	static get [Symbol.species]() {
		return Array;
	}

	static hasOption(obj, option) {
		return this.type(obj) === 'object' && option in obj;
	}
}
