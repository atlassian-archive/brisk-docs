# @brisk-docs/website

## 0.4.2

### Patch Changes

- c049aa9: Remove the word 'readme' from docs pages - readme now counts as the root page
- 0f01538: Fix the broken image links on the mdx pages - images now use a custom remark loader
- b8c67f9: Make margins of horizontal rules and headings uniform
- 5744ae9: Use switch-links everywhere for correct export builds - next does not handle relative paths in export

## 0.4.1

### Patch Changes

- 5df3e7d: Fix relative links in export builds of next.

  NOTE: This may actually break `brisk start` - I'm not sure. We are still doing this
  because we need this feature right now. Fixing brisk start will occur in the future.
  Nobody is using `brisk start` at the moment so this was deemed okay.

- Page content now takes up more of the page by default

## 0.4.0

### Minor Changes

- c5332ef: - Added the provision to add packages and docs description for the website by the consumers

  - Now there is an option to provide a package description string whicj will be displayed on the main page.
  - The docs is an object which can accept a name, path and description string.

### Patch Changes

- 143fa39: Fix the view source link
- d824f64: Added the docs also in the search drawer
- a922f2a: Hide the buttons on the package home page for examples/docs if the data is empty
- f50fee5: Remove Link from non-clickable nav items
- cd30e6a: Fix links that reference other internal markdown files
- c72e366: Improve the experience of nav:

  - Removed a lot of the padding on each nesting, making the content much more legible
  - Moved title to be in-line with how nav titles are meant to be, leading to reduction of space-usage
  - For folders with only one child, merge the folder and child, removing a thousand levels of nesting

## 0.3.11

- [patch] 88c05da:

  - Bundle critical file in package that was missing. Fix bug where non md files were treated as docs.

## 0.3.10

- [patch] 25f8239:

  - Resolve the SSR issues while loading the SSR non-compatible examples

- [patch] e8e6604:

  - Fix error in package home page when no package README

- [patch] 158dfbd:

  - Support non-default exports in examples pages

- [patch] bb26805:

  - Add missing babel plugin

## 0.3.9

- [patch] 6296ba2:

  - Changed examples render box to be a bordered box without a background

- [patch] c93b5e0:

  - Gracefully handle top-level docs directory being missing

- [patch] f97b57b:

  - Lower webpack version - a transitive problem from acorn in newer webpack was blocking building
    - See [this issue in next](https://github.com/zeit/next.js/issues/6240) for more details

- Updated dependencies [f97b57b]:
  - @brisk-docs/react-changelogs@0.1.4

## 0.3.1

- [patch] 9c1e298:

  - Convert website code to use typescript
  - Updated to use the newest version of next
  - Use next babel plugins instead of our own custom loader setup

- [patch] ea61c4b:

  - Display code blocks in markdown as syntax highlighted

- [patch] 1ce8baa:

  - 1. Added missing dependencies into the package.json 2. Fixed the config.js to solve the babel loader issues while installing the package in a consumer app.

- [patch] 08bd365:

  - Refactor of how pages are generated. This should have no visible side effects.

## 0.3.0

- [minor] 14b9ce9:

  - Complete examples page generation in the package filesystem structure.
  - When the showSubExamples in the config is true, the website displays all the sub examples (examples.js)
    in the package filesystem other than the examples folder.

- [minor] fce89ba:

  - Remove support for using JSX without importing React in the website.

- [minor] 7650b32:

  - Remove bundling of external examples using a separate config. Instead consumers should modify the website webpack config using the webpack hook.

- [patch] 8054797:

  - Add a page to display the changelog of a package

## 0.2.0

- [minor] e342242:

  - Fix binary
  - Add dev binary command and make start use next start
