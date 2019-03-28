# Changelog Extract
This library is designed to help you display changelogs and changelog information, as well as filtering a complete changelog to the relevant subset of changes.

We have two exports:

```js
import Changelog from 'package-name'
```

which is a react component, and

```js
import { divideChangelog, filterChangelogs } from 'package-name'
```

which are function.

## Changelog Component:

The changelog component is designed to display changelog entries in react. A base use-case would look something like:

```jsx
import Changelog from `package-name`
const stubChangelog = `# This package itself

## 1.0.0
- [major] 24601

## 0.5.0
- [minor] Who am I?

## 0.4.3
- [patch] And so, Honor, you see it's true,
- [minor] That man bears no more guilt than you!

## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!
	You see, I decided for these changelogs that I wanted to demonstrate how it renders a bunch of different content.
	
	We convert and render *whatever* markdown is in a changelog entry.`


export default () => (
	<Changelog changelog={stubChangelog} />
)
```

Note that we can also filter changelogs using the `range` prop, so if we modified the above component to be:

```jsx
<Changelog changelog={stubChangelog} range="^0.5.0" />
```

We would only see the changelog for `0.5.0` as it is the only one that matches that semver range.

The range property accepts any semver function for its filter comparison

For an example you can check out [this codesandbox](totes-a-link)

### Quick and dirty props table:

* `changelog`: The contents of a changelog file to be displayed. For more information on how we split and manage this, check out the `divide-changelogs` explanation below.
* `range`: the semver range within the changelog to be displayed.
* `entriesPerPage`: Set the number of entries to be shown per page. 

<div>
    <Props
        heading="Props"
        props={require('!!extract-react-types-loader!./src/components/changelog')}
    />
</div>

## Functions
We also export a couple of utility functions if you want to use these features but want to write your own renderer (or are not using react). We'll talk you through what they are doing so you can easily understand this package.

### divideChangelog

Divide changelog is the function that takes in a string, and return an array of changelogEntry objects. Its pattern looks something like this:

```js
divideChangelog(stubChangelog)
// outputs
[
    {
        version: '1.0.0',
        text: `## 1.0.0
- [major] 24601`,
    },
    {
        version: '0.5.0',
        text: `## 0.5.0
- [minor] Who am I?`,
    },
    {
        version: '0.4.3',
        text: `## 0.4.3
- [patch] And so, Honor, you see it's true,
- [minor] That man bears no more guilt than you!
`,
    },
    {
        version: '0.4.2',
        text: `## 0.4.2
- [patch] Who am I?
- [patch] I am Jean Valjean!`,
    },
];


```

The logic to divide the changelog is relatively simple, splitting the markdown file on the start of every `h2` (`##` in markdown). We then parse out the version being discussed (assuming it immediately follows the `h2`).

We also assume that we can find the version on the `h2` line to give each object a version number.

This allows you to map your changelog entries to a react component, or otherwise display, filter and analyse this information.

Check out [this sandbox]() to explore using the functions.

## filterChangelog (do we need this?)
filterChangelog takes in an array of changelogs in the format output by `divideChangelog`, and a semver range, and returns only changelog version that match that semver range.

```js
const narrowedChangelogs = filterChangelog(arrayOfEntries, "^0.4.0")
```

The functions use a file import to ensure easy code splitting if you are not using react, but want this feature.

## Importing a changelog

When using this tool, it is going to work best if you can use your actual changelog from your git repository. Here are several strategies for reading this information in:

### Webpack's Raw Loader

### Fetching the raw file from your repository

### Use `fs` to read it in and expose it server-side