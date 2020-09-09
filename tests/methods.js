import { test } from 'uvu';
import assert from 'uvu/assert';
import Arrayish from '../dist/arrayish.modern';

test('map', () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);

	// should return a new Arrayish instance altered by the map callback
	const mappedArrayish = arrayish.map(mapCB);

	const options = {
		returnArr: true,
	};
	// should return an array
	const mappedArray = arrayish.map(mapCB, options);

	assert.equal(mappedArrayish, new Arrayish({ unique: false }, 2, 4, 6, 8));
	assert.equal(mappedArray, [2, 4, 6, 8]);

	function mapCB(i) {
		return i * 2;
	}
});

test('reduce', () => {
	// prettier-ignore
	const arrayishToReduce = new Arrayish({ unique: false }, 1, 2, 3, 4);
	const arrayishReduced = arrayishToReduce.reducer((acc, curr) => acc + curr);
	const testReduced = [1, 2, 3, 4].reduce((acc, curr) => acc + curr);

	assert.equal(arrayishReduced, testReduced);
});

test('forEach', () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);

	function forEachCallback(item, i, arr) {
		arr[i] = item * 2;
	}

	arrayish.forEach(forEachCallback);

	assert.equal(arrayish, new Arrayish({ unique: false }, 2, 4, 6, 8));

	// Should not accept a thisArg like in the spec
	// a necessary casualty, can be reassessed later
	const arrayishUseThis = new Arrayish({ unique: false }, 2, 4, 5, 10);
	arrayishUseThis.forEach(forEachCallback, new Arrayish({ unique: false }));

	assert.not.equal(
		arrayishUseThis,
		new Arrayish({ unique: false }, 5, 9, 11, 21)
	);
});

test('asyncEach', async () => {
	const arrayish = new Arrayish({ unique: false }, 1, 2, 3, 4);

	const wait = () => new Promise(res => setTimeout(res, 100));

	await arrayish.forEach(async function (item, i, arr) {
		await wait();
		arr[i] = item * 2;
	}, true);

	assert.equal(arrayish, new Arrayish({ unique: false }, 2, 4, 6, 8));
});

test.run();
