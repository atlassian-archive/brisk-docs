# Getting started

> This document is for deving on this mono-repo. For information on using brisk in your own project see the [@brisk-docs/website documentation](../packages/website)

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

```sh
bolt test
```
