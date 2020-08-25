import { test } from 'uvu';
import assert from 'uvu/assert';
import ArrayLike from '../src/index';

test('map', () => {
	const arrayLike = new ArrayLike(1, 2, 3, 4);

	// should return a new ArrayLike instance altered by the map callback
	const mappedArrayLike = arrayLike.map(mapCB);

	const options = {
		returnArr: true,
	};
	// should return an array
	const mappedArray = arrayLike.map(mapCB, options);

	assert.equal(mappedArrayLike, new ArrayLike(2, 4, 6, 8));
	assert.equal(mappedArray, [2, 4, 6, 8]);

	function mapCB(i) {
		return i * 2;
	}
});

test('reduce', () => {
	// prettier-ignore
	const arrayLikeReduced = new ArrayLike(1, 2, 3, 4).reduce((acc, curr) => acc + curr);
	const testReduced = [1, 2, 3, 4].reduce((acc, curr) => acc + curr);

	assert.equal(arrayLikeReduced, testReduced);
});

test('forEach', () => {
	const arrayLike = new ArrayLike(1, 2, 3, 4);

	function forEachCallback(item, i, arr, that) {
		arr[i] = item * 2;
		if (that && that.length === 0) arr[i] += 1;
	}
	arrayLike.forEach(forEachCallback);
	assert.equal(arrayLike, new ArrayLike(2, 4, 6, 8));

	// Should not accept a thisArg like in the spec
	// a necessary casualty, can be reassessed later
	const arrayLikeUseThis = new ArrayLike(2, 4, 5, 10);
	arrayLikeUseThis.forEach(forEachCallback, new ArrayLike());

	assert.not.equal(arrayLikeUseThis, new ArrayLike(5, 9, 11, 21));
});

test.run();
