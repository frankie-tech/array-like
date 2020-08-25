# asyncEach method examples

`ArrayLike` includes a method `asyncEach` which can be used to run async functions in a `forEach` loop. Taking advantage of async/await and even promises inside of a loop has it's own advantages. But beware the arsenal of foot guns it has stowed away.

The main idea is that it should be used inside of an async function, you support for top-level await. Your `asyncEach` callback must also be async.

## Here's some examples:

### Broken

```js
const arrayLike = new ArrayLike(1, 2, 3, 4);
// simulates an async process
const wait = () => new Promise(res => setTimeout(res, 500));

console.log('starting');

arrayLike.asyncEach(function (item, i, arr) {
	wait();
	arr[i] = item * 2;
	console.log(arr[i]);
});

console.log('done');
```

#### Output

```sh
> starting
> done
> 2
> 4
> 6
> 8
```

### Works

```js
const arrayLike = new ArrayLike(1, 2, 3, 4);
// simulates an async process
const wait = () => new Promise(res => setTimeout(res, 500));

async function alterArray() {
	console.log('starting');

	await arrayLike.asyncEach(async function (item, i, arr) {
		await wait();
		arr[i] = item * 2;
		console.log(arr[i]);
	});

	console.log('done');
}

alterArray();
```

#### Output

```sh
> starting
> 2
> 4
> 6
> 8
> done
```

## Explanation

Despite the callback being run inside of an async function, we need to tell the callback that it is an async function. This is the only way that we can truly take advantage of `asyncEach`. If you prefer functional programming, you can also define your callback outside the `asyncEach` method:

```js
async function asyncCB(item, i, arr) {
	await wait();
	arr[i] = item * 2;
	console.log(arr[i]);
}
async function alterArray() {
	console.log('starting');
	await arrayLike.asyncEach(asyncCB);
	console.log('done');
}

alterArray();
```

#### Output

```sh
> starting
> 2
> 4
> 6
> 8
> done
```
