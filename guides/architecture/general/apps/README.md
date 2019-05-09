# App

Maps directly to the [organisms](http://bradfrost.com/blog/post/atomic-web-design/#organisms)
concept of atomic design

Any app is a composition of components
([atoms](http://bradfrost.com/blog/post/atomic-web-design/#atoms) and
[molecules](http://bradfrost.com/blog/post/atomic-web-design/#molecules))

Within a monorepo structure an "app" is nothing more than just a package.

## Package structure

Every package should have exactly the same structure. Similar to most of the packages everywhere,
"production" code (i.e. the actual source code of the functionality this package implements) lives
in its own folder. At the root there should be only "helper" files and folder: those that define the
structure, set up rules that are applicable for the whole package, or provide all necessary
information about said package.

A typical package should have the following structure.

-   **/docs** _(optional)_ - detailed docs for the package, that render integration examples and props API
-   **/examples** _(optional)_ - contains integration examples for this package. Those examples should be considered
    "public API" for this packages. They will be rendered in the "docs" area on the website, and
    could be used for integration tests with Cypress. See
    [more information here](./public-examples.md)
-   **/integration-tests** _(optional)_ - integration tests for this package, usually written with Cypress. See
    [more information here](./cypress-integration-tests.md)
-   **/src** - contains all the source code for this package, including unit tests. See more on how
    to structure code of this folder [below](#/src-structure).
-   **.tangerinerc.js** - enables a set of tooling and rules for the package (including, but not
    limited to, eslint and stricter rules). Jira-specific at the moment.
-   **manifest.json** - contains information about who owns this particular package. Only valid in
    the absense of monorepo and packages infrastructure, as a substitute to package.json
-   **package.json** - just a normal package.json
-   **README.md** - lightweight docs for this package

## /src structure

As mentioned above, the src folder should contain all the source code of a package. In a simple case
of a small package with just one component inside, it can contain only a few files that follow
guidelines for structuring components (of any type). If a package is more complicated than a simple
component, it should follow this structure:

-   **[/common](common-layer/README.md)** _(optional)_ - components (and other things) that are global to a package.
    Should follow all the guidelines for structuring common folder and writing common functionality.
-   **[/controllers](controllers-layer/README.md)** _(optional)_ - components that are responsible for shared state
    management concerns and other stateful logic. Should follow all the guidelines for structuring
    controllers folder and writing state controllers.
-   **[/services](services-layer/README.md)** _(optional)_ - services and other data providers that are specific to
    this app. Components here implement what is usually called "remote state". Should follow all the
    guidelines for structuring services folder and writing data providers.
-   **[/ui](ui-layer/README.md)** _(optional)_ - all components that are considered “UI” components, i.e. anything
    that renders something on a screen. This is the main part of any app, most of logic will go
    here, including composition of different components, [services](../services-layer/structure.md)
    and [state controllers](controllers-layer/structure.md). Should follow all the guidelines for
    structuring UI folder.
-   **async.js** _(optional)_ - async version if needed
-   **feature-flags.js** _(optional)_ - feature flags of this package exposed as functions
-   **index.js** _(optional)_ - re-exports what is considered part of the core public API of a package
-   **main.js** _(optional)_ - in the absence of ui folder contains main logic of the package. If ui folder exists,
    main logic will go there, and this file will contain only composition of providers that should
    exist at the very root of the package.

## Full app/package structure

There are different types of packages that can be implemented.

### Simple package

```
/my-awesome-package
├── /examples
│   ├── 01-some-default-something.examples.js
│   ├── 02-another-something.examples.js
│   └── 03-another-addition.examples.js
├── /src
│   ├── examples.js
│   ├── index.js
│   ├── main.js
│   ├── messages.js
│   ├── styled.js
│   └── types.js
├── manifest.json
├── package.json
├── README.md
└── tangerinerc.js
```

### Simple package with [services](../components/components-types/services) (or [controllers](../components/components-types/controllers))

```
/my-awesome-package
├── /examples
│   ├── 01-some-default-something.examples.js
│   ├── 02-another-something.examples.js
│   └── 03-another-addition.examples.js
├── /src
│   ├── /services
│   │   ├── /data-fetching-something
│   │   │   ├── index.js
│   │   │   ├── test.js
│   │   │   └── utils.js
│   │   └── /some-other-data-fetching-thing
│   │       ├── constants.js
│   │       ├── test.js
│   │       ├── types.js
│   │       └── index.js
│   ├── examples.js
│   ├── index.js
│   ├── messages.js
│   ├── main.js
│   ├── styled.js
│   └── types.js
├── manifest.json
├── package.json
├── README.md
└── tangerinerc.js
```

### Simple package with [UI layer](../components/components-types/ui) only

```
/my-awesome-package
├── /examples
│   ├── 01-some-default-something.examples.js
│   ├── 02-another-something.examples.js
│   └── 03-another-addition.examples.js
├── /src
│   ├── /ui
│   │   ├── /error-flag
│   │   │   ├── examples.js
│   │   │   ├── index.js
│   │   │   ├── messages.js
│   │   │   └── styled.js
│   │   └── /simple-dialog
│   │   │   ├── /some-form-inside-dialog
│   │   │   │   ├── examples.js
│   │   │   │   ├── index.js
│   │   │   │   ├── messages.js
│   │   │   │   ├── types.js
│   │   │   │   └── styled.js
│   │   │   ├── constants.js
│   │   │   ├── examples.js
│   │   │   ├── index.js
│   │   │   └── types.js
│   │   ├── constants.js
│   │   ├── examples.js
│   │   ├── index.js
│   │   └── types.js
│   ├── index.js
│   └── main.js
├── manifest.json
├── package.json
├── README.md
└── tangerinerc.js
```

### Package with a few layers

```
/my-awesome-package
├── /examples
│   ├── 01-some-default-something.examples.js
│   ├── 02-another-something.examples.js
│   └── 03-another-addition.examples.js
├── /src
│   ├── /common
│   │   ├── constants.js
│   │   └── types.js
│   ├── /services
│   │   ├── /data-fetching-something
│   │   │   ├── index.js
│   │   │   ├── test.js
│   │   │   └── utils.js
│   │   └── /some-other-data-fetching-thing
│   │       ├── constants.js
│   │       ├── test.js
│   │       ├── types.js
│   │       └── index.js
│   ├── /ui
│   │   ├── /error-flag
│   │   │   ├── examples.js
│   │   │   ├── index.js
│   │   │   ├── messages.js
│   │   │   └── styled.js
│   │   └── /simple-dialog
│   │   │   ├── /some-form-inside-dialog
│   │   │   │   ├── examples.js
│   │   │   │   ├── index.js
│   │   │   │   ├── messages.js
│   │   │   │   ├── types.js
│   │   │   │   └── styled.js
│   │   │   ├── constants.js
│   │   │   ├── examples.js
│   │   │   ├── index.js
│   │   │   └── types.js
│   │   ├── constants.js
│   │   ├── examples.js
│   │   ├── index.js
│   │   └── types.js
│   ├── index.js
│   └── main.js
├── manifest.json
├── package.json
├── README.md
└── tangerinerc.js
```

## Rules

### [import/no-restricted-paths](/packages/eslint-plugin-tangerine/rules/import/no-restricted-paths)

The below configuration restricts importing from certain directories as per the app guidelines:

-   Inside `/services`, you cannot import from `/controllers` or `/ui`
-   Inside `/controllers`, you cannot import from `/services` or `/ui`
-   Inside `/common`, you cannot import from `/services`, `/controllers`, or `/ui`

#### Config

```js
'tangerine/import/no-restricted-paths': [
  'error',
  {
    basePath: path.join(appRoot, 'src'),
    srcRoot: 'src',
    restrictions: [
      {
        target: 'services',
        from: ['controllers', 'ui'],
      },
      {
        target: 'controllers',
        from: ['services', 'ui'],
      },
      {
        target: 'common',
        from: ['services', 'controllers', 'ui'],
      },
    ],
    message:
      '\nSee https://github.com/atlassian/tangerine/tree/master/guides/code/app/apps/structure for more details.',
  },
],
```
