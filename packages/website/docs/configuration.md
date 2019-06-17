# Configuration

To customise the docs website you can create a `docs.config.js` file in the root of
your project. This file should be a Node.js module which exports a function, e.g.

```js
// docs.config.js
module.exports = () => ({
  siteName: 'My awesome docs',
});
```

the returned object may have the following properties:

| Option   | Description                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| packages | Path or array of paths of packages to show. Glob patterns are allowed                                                               |
| docs     | Path to the directory where project docs live                                                                                       |
| siteName | Display name for the project as displayed in the website                                                                            |
| webpack  | A function used to customise the website's webpack configuration. see [Configuring webpack](./configuring-webpack) for more details |

## Nested configuration

Nested configuration is also supported for cases where you'd like to configure things on a per-directory basis.

The available options in a nested `docs.configs.js` file are:

### sortOrder

Type: `string[]`

Here you can customise the sort order of docs within a specific directory. This will affect in what order they are displayed in the navigation and index page tables.

To use this, provide a list of doc dirnames/filenames (without their extension) to set the ascending sort order. Any file that isn't listed in the array will be sorted after them using the default alphabetical sorting. You can also pass a wildcard `'*'` value to configure where the files that aren't listed should go. This is useful for specifying documentation to always be listed at the bottom without having to explicitly list every other docs file.

E.g.

```js
sortOrder: [
  'something-very-important',
  'second-most-important',
  '*',
  'should-display-after-everything-else',
];
```
