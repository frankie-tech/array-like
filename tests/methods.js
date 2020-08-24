import { test } from 'uvu';
import assert from 'uvu/assert';
import ArrayLike from '../src/index';

test('map', () => {
	const arrayLike = new ArrayLike(1, 2, 3, 4);
	const test = [1, 2, 3, 4];

	assert.not.equal(arrayLike, test);

	const mappedArrayLike = arrayLike.map(mapCB);
	const mappedTest = test.map(mapCB);
	assert.equal(mappedArrayLike, mappedTest);

	function mapCB(i) {
		return i * 2;
	}
});

test.run();
