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

test.run();
