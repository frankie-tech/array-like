import { test } from 'uvu';
import assert from 'uvu/assert';
import ArrayLike from '../src/index';

test('type', () => {
	const array = ArrayLike.type([]);
	const object = ArrayLike.type({});
	const symbol = ArrayLike.type(Symbol());
	const string = ArrayLike.type('');
	const undef = ArrayLike.type(undefined);
	const nulled = ArrayLike.type(null);
	const bool = ArrayLike.type(false);
	const number = ArrayLike.type(1);
	const nan = ArrayLike.type(NaN);
	const func = ArrayLike.type(() => {});
	const err = ArrayLike.type(Error());

	assert.equal(array, 'array');
	assert.equal(object, 'object');
	assert.equal(symbol, 'symbol');
	assert.equal(string, 'string');
	assert.equal(undef, 'undefined');
	assert.equal(nulled, 'null');
	assert.equal(bool, 'boolean');
	assert.equal(number, 'number');
	assert.equal(nan, 'number');
	assert.equal(func, 'function');
	assert.equal(err, 'error');
});

test('unique', () => {
	const arrayLike = new ArrayLike({ unique: true }, 1, 1, 1, 1);
	const test = new ArrayLike(1);

	assert.equal(arrayLike, test);

	// should return array
	const unique = ArrayLike.unique({ returnArr: true }, 1, 1, 1, 1, 1);
	const uniqueTest = [1];

	assert.equal(unique, uniqueTest);

	const uniqueArrayLike = ArrayLike.unique(1, 1, 1, 1);
	const uniqueArrayLikeTest = new ArrayLike(1);

	assert.equal(uniqueArrayLike, uniqueArrayLikeTest);
});

test.run();
