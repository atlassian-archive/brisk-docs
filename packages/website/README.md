# Brisk Docs website generator

Brisk Docs is a package oriented documentation system that lets you write useful, interactive
docs alongside your code. It is aimed at documenting packages in a mono-repo

## Getting started

Start by installing Brisk Docs in your project

```shell
npm install @brisk-docs/website
```

To start your docs website locally:

```shell
npm run brisk dev
```

To produce a static build of the website that can be statically hosted:

```shell
npm run brisk build && npm run brisk export
```

## Organising your documentation

Brisk Docs by default uses file and folder name conventions to find docs in your codebase and display them in a organised way.

### Project level documentation

For guides and docs relating to your project or repository as a whole, Brisk Docs will display any Markdown or [MDX](https://mdxjs.com/) files placed in the `/docs` folder at the top of your repository. This is a good place to put user guides, tutorials, contributor guidelines etc.

### Package level documentation

Brisk Docs has first class support for multi-package repos. All packages found in the `/packages` directory of your project will have documentation generated automatically.

Read more about package documentation in our [package documentation guide.](./docs/writing-package-docs)

## Using MDX

MDX means that we parse markdown a little differently, and treat jsx blocks as react components.

This means that you can write:

```mdxjs
# Just a regular markdown package

import MyComponent from './src/myComponent'

<MyComponent>I could not be expressed just with markdown<.MyComponent>

Just some more _regular_ markdown here.
```

In addition to being able to render any markdown, brisk provides two components that can be used on any
page without being imported.

They are `<Props />` and `<FileViewer />` - these are exports of [pretty-proptypes](https://github.com/atlassian/extract-react-types/tree/master/packages/pretty-proptypes) and [file-viewer](../../packages/file-viewer)
