import { test } from 'uvu';
import assert from 'uvu/assert';
import Arrayish from '../dist/arrayish.modern';

test('species', () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);
	assert.type(arrayish, 'object');
	assert.instance(arrayish, Array);
});

test('value', () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);
	assert.is(arrayish, arrayish);
	assert.is.not(arrayish, [1, 2, 3, 4]);
});

test('length', () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);
	assert.equal(arrayish.length, [1, 2, 3, 4].length);
	assert.equal(arrayish.last, 4);
});

test.run();
