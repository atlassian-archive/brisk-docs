# Brisk Docs

> Tools to document your mono-repos and React Packages

Brisk is an Atlassian Initiative to help with documenting code. It contains two main parts:

## [The Brisk Website Generator](./packages/website)

This is packaged as `@brisk-docs/website` and is designed as an all-inclusive documentation
tool for mono-repos containing react components and other packages. Check out [the package's documentation](./packages/website)
for more information on how to use it.

## Support Packages

As part of being maximally useful, we want to make sure where possible, our helper components exist as
their own packages. As such, there are a number of other libraries we maintain that you might be interested
in, even if you don't need the complete set of things that brisk does:

- [file viewer](./packages/file-viewer) - simple package to run a live component example alongside displaying its code
- [react changelogs]('./packages/react-changelogs) - Component that accepts raw changelog files and formats them for display. Allows filtering to semver versions
- [extract-react-types](https://extract-react-types.com/) - a way to extract and display types for components, works on both flow and typescript
- [codesandboxer](https://github.com/codesandbox/codesandboxer) - Deploy a single file to codesandbox to make your code easy to share and collaborate on - can be used from node or from within a react app
