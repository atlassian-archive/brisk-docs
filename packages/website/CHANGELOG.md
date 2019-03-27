# @brisk-docs/website

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
