import { test } from 'uvu';
import assert from 'uvu/assert';
import Arrayish from '../src/index';

test('type', () => {
	const array = Arrayish.type([]);
	const object = Arrayish.type({});
	const symbol = Arrayish.type(Symbol());
	const string = Arrayish.type('');
	const undef = Arrayish.type(undefined);
	const nulled = Arrayish.type(null);
	const bool = Arrayish.type(false);
	const number = Arrayish.type(1);
	const nan = Arrayish.type(NaN);
	const func = Arrayish.type(() => {});
	const err = Arrayish.type(Error());

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
	const arrayLike = new Arrayish({ unique: true }, 1, 1, 1, 1);
	const test = new Arrayish(1);

	assert.equal(arrayLike, test);

	// should return array
	const unique = Arrayish.unique({ returnArr: true }, 1, 1, 1, 1, 1);
	const uniqueTest = [1];

	assert.equal(unique, uniqueTest);

	const uniqueArrayLike = Arrayish.unique(1, 1, 1, 1);
	const uniqueArrayLikeTest = new Arrayish(1);

	assert.equal(uniqueArrayLike, uniqueArrayLikeTest);
});

test.run();
