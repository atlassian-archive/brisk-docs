# Getting started

This project is a monorepo of several packages which can be managed using bolt.
Before starting your work on any of the packages make sure you run:

```sh
yarn global add bolt
# install dependencies
bolt
```

Our docs website is the main way to work on components and get feedback on changes.
To start the website locally run:

```sh
bolt docs
```

## Testing

We use Jest for unit testing and Cypress for integration tests.

To run unit tests across the entire project:

```sh
bolt test
```

or for a single package:

```sh
bolt w <package name> test
```
