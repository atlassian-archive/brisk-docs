# @brisk-docs/website

## 0.8.0

### Minor Changes

- 017909a: Remove the possibility of specifying docsList/packagesPaths from config.

  Before this change, specifying `docsList` or `packagesPaths` would override
  the intended configuration of the `docs`/`packages` entries.

  - 7014ef8: Allow homepage tile images to be customised

- 371f5ff: Remove the useManifests option
- 81f4f9a: arbitrary links can now be specified for the homepage
- 6dbc7dc: Add scaffolding for new website build pipeline. This is available as a brisk-next command.
- 4a3311b: Move page writing functionality into generate-pages pipeline stage.

### Patch Changes

- a53f861: Removed unused dependency
- bf043e9: Update pretty proptypes dependency
- 6dbc7dc: Fix babel configs for building packages to produce working dists for node scripts.

## 0.7.4

### Patch Changes

- d6ad582: Update extract-react-types to support new features in that package
- 9c2ac03: The package Id is being set as the name from the package.json while generating pages. The display name in the all packages home page and nav content has been set as the file name.

## 0.7.3

### Patch Changes

- bc7cc0e: allow configuration of package home page fields from docs.config.js
- f780aab: Add support for customising page title via markdown frontmatter
- 8e2abcb: Fix button links from remounting on component re-renders such as on hover
- a09d513: Update document title to have trailing site name suffix rather than prefix
- f6c2d2d: Add --debug flag to brisk commands
- 0cf7b35: Add default site favicon and ability to configure your own
- b4931b7: Add ability to add yaml frontmatter to markdown pages that will be stripped and parsed as metadata. Currently the metadata is not used but there will be support for specific attributes in the future.

## 0.7.2

### Patch Changes

- ba3f641: Add icon to external links
- 5e94b59: Move default pages into their own folder, then copy the folder contents into pages on each build

  This fixes an internal problem where changing what docs are generated could cause unneeded pages
  to persist, slowing brisk down, or erroring the build. This should not change the user experience.

- 75f4881: Fix images not loading after a build/export

- eba9344: Add check to ensure navigation renders

## 0.7.1

### Patch Changes

- ce3b711: Add ability to specify custom sort order of docs within a directory via nested docs.config.js. See the [configuration](./docs/configuration.md) docs for more details.
- 0595810: Add thread-loader to babel processes - this significantly improves build times in large projects.
- 2b2da97: Added fix in the custom mdx image loader to exclude absolute URLs while trying to add Import and Image component
- e8a62b6: Fix broken relative links on package home pages
- 7ae804d: Add option `showExamples`, which defaults to true, that turns off all examples in brisk
- 2ec2ea9: Fix broken project doc links in root readme nav when project doc name and path don't match

## 0.7.0

### Minor Changes

- 445bf8a: When the docs folder nests, display all nested items

### Patch Changes

- 62ae6ef: When custom names are chosen, still use the path to generate urls, so that relative links still "just work"
- 06d3aeb: Fixed a number of console errors
- 6f5746d: Use custom port for website if provided

## 0.6.0

### Minor Changes

- 76dc8dc: - Added the support for multi level packages and their nav items grouping.

  - This is necessary because without grouping the nested packages also falls in the root level flat structure in nav which makes package discoverability difficult.
  - For the multi level packages to show up in the website, consumers need to specify packages: ['./packages/**/*'] in the docs.config.js
  - This is being set as the default configuration of the website. If need to override consumers can specify packages: ['./packages/*']
    or any other location according to their requirements.
  - Updated the version of extract react loader

### Patch Changes

- f49737e: Added new file viewer package

## 0.5.2

### Patch Changes

- 06e0757: Fix bug where nav would error and throw in readme pages

## 0.5.1

### Patch Changes

- 1037572: The npm:include option for files meant we could accidentally publish our own `docs` and `guides` and `packages` folders - this would cause errors when someone else ran them. The ignore now only includes ts files, which solves this for us.
- 1037572: When given a space in a docs section name, convert it to a dash, be a little bit safer with these names

## 0.5.0

### Minor Changes

- 0d0d3bd: Impelmented changes to support multiple documentations folders in our website

### Patch Changes

- f49a1e5: Code view in examples page is expandable/collapsible
- 2dc8740: Added breadcrumbs to changelog page
- 9b2744e: Added support for the root level README file
- ccf1a90: Do not show folders in nav if they are empty
- ccf1a90: Exclude files starting with \_ from page creation in the website
- c3ec79f: Remove doc key prefix from table paths
- 013cd06: Change breadcrumbs to use Next Links as custom components
- ebf8467: Added breadcrumbs for easier navigation
- 69cf699: Added navigation to Nav header and removed the back to home item

## 0.4.3

### Patch Changes

- 20f7686: The previous version flattened out readmes, but broke all relative links from within readme.md files. Making urls less happy to make this work

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
