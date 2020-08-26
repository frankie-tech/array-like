import { test } from 'uvu';
import assert from 'uvu/assert';
import Arrayish from '../dist/array-ish.modern';

test('species', () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);

	assert.type(arrayLike, 'object');
	assert.instance(arrayLike, Array);
});

test('value', () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);
	assert.is(arrayLike, arrayLike);
	assert.is.not(arrayLike, [1, 2, 3, 4]);
});

test('length', () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);
	assert.equal(arrayLike.length, [1, 2, 3, 4].length);
	assert.equal(arrayLike.last, 4);
});

test.run();
