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

| Option              | Description                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| customPackageFields | Array of fields from the relevant package.json to display on the package home page. This augments the default set.                  |
| docs                | Object (or array of Object) describing the project docs.                                                                            |
| favicon             | Absolute path to an .png file to use as the site's favicon e.g. `path.join(__dirname, 'favicon.png')`                               |
| links               | Optional array of Object with links to display on the homepage                                                                      |
| packages            | Path or array of paths of packages to show. Glob patterns are allowed. e.g. `path.join(__dirname, 'packages', '*')`                 |
| packagesDescription | Optional String to replace the default description for the packages section                                                         |
| readMePath          | Optional String path to an alternative specific mdx file to use as the "Get Started" page.                                          |
| showExamples        | Optional Boolean (default true) to include/exclude examples                                                                         |
| showSubExamples     | Optional Boolean to include/exclude subExamples within packages                                                                     |
| siteName            | String Display name for the project as displayed in the website                                                                     |
| templates           | Set up templates for particular kinds of pages in brisk                                                                             |
| webpack             | A function used to customise the website's webpack configuration. see [Configuring webpack](./configuring-webpack) for more details |

### customPackageFields

Type: optional `string[]`

Array of fields from the relevant package.json to display on the package home page. These are added to the default set.

e.g. `['author', 'dependencies']`

### docs

Type: optional `object` or `object[]`
defaults to:

```js
{
  path: './docs',
  name: 'Docs',
  description: 'View the documentation for this project',
}
```

Object describing documentation sections

- `path`: `string` of the absolute path to the documentation section's directory e.g. `path.join(__dirname, 'docs')`
- `name`: `string` to use for the documentation section e.g. `'Docs'`
- `description`: Optional `string` description to refer to e.g. `'Documentation is contained within this section.'`
- `urlPath`: Optional `string` specifying the URL subpath to use. e.g `'docs'`. If not supplied, this will be inferred from the directory name.

For a given path, if it does not exist, that section will not be generated.

### favicon

Type: optional `string` defaults to `path.join(__dirname, 'favicon.png')`

Absolute path to an `.png` file to use as the site's favicon. If the file does not exist, a default favicon will be added to the site.

e.g. `path.join(__dirname, 'new_favicon.png')`

### links

Type: optional `object[]` defaults to `[]`

Array of links to arbitrary places. These will be tiles at the end of all other tiles on the homepage.

Each link has the following shape:

- `label`: `string` to display on the home page tile
- `description`: Optional `string` to display on the home page tile
- `href`: `string` full URL (to external site) or internal link e.g. `/packages`

e.g.

```js
[
  {
    label: 'Get accomplished today!',
    href: '/docco/guides/how-to-be-accomplished',
  },
  {
    label: 'Get a job!',
    description:
      'Browse the available Atlassian career opportunities and join the team.',
    href: 'https://www.atlassian.com/company/careers/all-jobs',
  },
];
```

### packages

Type: `string` or `string[]`

Path or array of paths of packages to show. Glob patterns are allowed.

The "name" used is based on the directory name that the package is in. The URL path generated is based on the `name` in the `package.json`.
Note that packages with the same name (`name` in their `package.json`) will collide with each other.

e.g. `path.join(__dirname, 'packages', '*')`

### packagesDescription

Type: optional `string` defaults to `'View documentation about individual packages'`

String to replace the default description for the packages section.

e.g. `'This is the documentation for the packages.'`

### readMePath

Type: optional `string` default 'README.md'

If the file at `readMePath` exists, a "Get Started" page is generated at `/readme`.

### showExamples

Type: optional `boolean` default `true`

Whether to generate examples pages or not.

### showSubExamples

Type: optional `boolean` default `false`

Specifies whether to include/exclude nested examples within packages. If true, e.g. `packageName/src/examples.js` and `packageName/lib/examples.js`
will be found and presented as examples.

`showExamples` must be `true` for this option to take effect.

### siteName

Type: `string`

Display name for the project as displayed in the website

e.g. `Fancy Docs`

### webpack

Type: optional `Function` customizing webpack's configuration. Defaults to `identity`

See [Configuring webpack](./configuring-webpack.md) for more details.

### templates

Type: optional `object[]` defaults to `[]`

Allows you to specify a component to be rendered on a page. This feature is still experimental.

To add a template to a page, you can add an object to the array of the shape

```json
{
  // the page you want to display this template component ont
  "page": string,
  // the position you want to display the template component in
  "position": string,
  // a path to the component you wish to render
  "component": string
}
```

Current pages that support templates:

- `package:home`

Positions for template are: `above`, `below`, and `replace`

`component` accepts a string which is a path to a file we will load. We treat this file as a react component to load on the website.

We pass two props to this component: `data` and `pageComponent`. To get an idea of what is being passed, you could add the following component as a template.

```js
import React from 'react';

export default ({ data }) => console.log(data) || null;
```

You can also style the page contents using something such as:

```js
import React from 'react';

export default ({ pageComponent: Component }) => (
  <div
    style={{
      textAlign: 'center',
      color: 'rebeccapurple',
      backgroundColor: 'hotpink',
      borderRadius: '16px',
      padding: '8px',
      marginTop: '16px',
    }}
  >
    <Component />
  </div>
);
```

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
