import { test } from 'uvu';
import assert from 'uvu/assert';
import Arrayish from '../dist/array-ish.modern';

test('map', () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);

	// should return a new Arrayish instance altered by the map callback
	const mappedArrayLike = arrayLike.map(mapCB);

	const options = {
		returnArr: true,
	};
	// should return an array
	const mappedArray = arrayLike.map(mapCB, options);

	assert.equal(mappedArrayLike, new Arrayish({ unique: false }, 2, 4, 6, 8));
	assert.equal(mappedArray, [2, 4, 6, 8]);

	function mapCB(i) {
		return i * 2;
	}
});

test('reduce', () => {
	// prettier-ignore
	const arrayLikeReduced = new Arrayish({ unique: false }, 1, 2, 3, 4).reducer((acc, curr) => acc + curr);
	const testReduced = [1, 2, 3, 4].reduce((acc, curr) => acc + curr);

	assert.equal(arrayLikeReduced, testReduced);
});

test('forEach', () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);

	function forEachCallback(item, i, arr) {
		arr[i] = item * 2;
	}

	arrayLike.forEach(forEachCallback);

	assert.equal(arrayLike, new Arrayish({ unique: false }, 2, 4, 6, 8));

	// Should not accept a thisArg like in the spec
	// a necessary casualty, can be reassessed later
	const arrayLikeUseThis = new Arrayish({ unique: false }, 2, 4, 5, 10);
	arrayLikeUseThis.forEach(forEachCallback, new Arrayish({ unique: false }));

	assert.not.equal(
		arrayLikeUseThis,
		new Arrayish({ unique: false }, 5, 9, 11, 21)
	);
});

test('asyncEach', async () => {
	const arrayLike = new Arrayish({ unique: false }, 1, 2, 3, 4);

	const wait = () => new Promise(res => setTimeout(res, 100));

	await arrayLike.asyncEach(async function (item, i, arr) {
		await wait();
		arr[i] = item * 2;
	});

	assert.equal(arrayLike, new Arrayish({ unique: false }, 2, 4, 6, 8));
});

test.run();
