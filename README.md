# Arrayish - an Array subclass

## About

I wanted to create an Array Extension for fun and also to add some utilities that I really wanted. What I'm trying to say is, you probably don't want to use this in production.

Uses:

-   [Microbundle](https://github.com/developit/microbundle) (pre-configured bundler)
-   [Husky](https://github.com/typicode/husky) (formatting on commit)
-   Prettier (formatting)
-   map & reduce are borrowed/extended from [@arr by lukeed](https://github.com/lukeed/arr)

## Documentation

You can't call it using the standard `[]`, you have to use an actual constructor. Part of the "features" is that you can make the Arrayish instance unique on construction, so each construction must pass an options object. _This might be revised later._

```js
const arrayish = new Arrayish({ unique: false }, 1, 1, 1, 1, 1);
console.log(arrayish); // [ 1, 1, 1, 1, 1 ]
```

There are also a few static methods that are exposed, such as `unique()`

```js
// can return either an Arrayish or an array
const uniqueArrayish = Arrayish.unique({ returnArr: false }, ...arrayish);
console.log(uniqueArrayish); // [ 1 ]
console.log(uniqueArrayish instanceof Arrayish); // true
```

## Scripts

I use yarn for this project. Here's the scrripts you would use:

```sh
> yarn
# to install and add everything

> yarn start
# cleans the dist folder, runs microbundle with the watch command

> yarn build
# cleans the dist folder, runs microbundle to build a modern and umd version, then runs tests on the modern version
```

I recommend inspecting the `package.json` to see how each of the scripts are built.
