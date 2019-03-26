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
