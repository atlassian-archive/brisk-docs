# Contributing

In order to contribute to Brisk, we make the following assumptions:

1. Node 10.9
2. Yarn 1.16

## Setup

If you have [`nvm`](https://github.com/nvm-sh/nvm) installed, you can use that to set the version of Node we use:

```sh
$ nvm use
```

Then make sure you've installed all the dependencies:

```sh
$ yarn
```

## Development

Running the Brisk in dev mode is as simple as:

```sh
$ npm run dev:website
```

This will spin up a development servr on `http://localhost:3000/`.

_Note: the site will compile pages as you request them._
