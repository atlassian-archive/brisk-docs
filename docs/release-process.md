# Our Release Process

## Making Pull Requests

- run `bolt changeset` - select all packages affected by your change
- Fill out a description of the change - this will end up in the changelog
- If it was too hard to write everything in one line, go to the `.changeset/{CHANGESET_ID}/changes.md` file and flesh out the change. The entire markdown chunk here will be written to your changeset, so feel free to include code snippets or suggestions on how to upgrade if they are needed
  - IF IT WAS **A BREAKING CHANGE**, you should definitely do this
- It’s better to make multiple changesets, even for the same packages, to get good changelog entries, rather than trying to condense them and end up with useless changelogs

## How releases work

We currently do manual releases. Our release process looks like:

### Extra stuff on releasing

We have had several incidents where we have run a release, having had tests pass, and run some local checks, and still broken things.

The most common breakages are links and images. This is because of three major reasons:

1. Running `brisk build && brisk export` produces different results than running `brisk dev`, which we usually use for testing
2. Brisk's own documentation has not had images, so we haven't looked at it
3. There still appear to be some cases where the behaviour in brisk is different running within the repo and running from external packages.

We need to add safeguards to cover this out, so, when releasing also do:

- `cd packages/website && yarn pack`
- Pull down the AF repository, and install brisk from the yarn pack generated tar. `yarn add file:/path/to/generated/tarball.tgz`
- In AF, run `yarn brisk build && yarn brisk export && yarn start`
- Visit the following pages and verify that: Images load, internal links work as expected, nav links work as expected
  - [http://localhost:8080/guides/architecture/general/components/state-management/README/](http://localhost:8080/guides/architecture/general/components/state-management/README/)
  - [http://localhost:8080/readme/](http://localhost:8080/readme/)
  - [http://localhost:8080/packages/eslint-plugin-tangerine/](http://localhost:8080/packages/eslint-plugin-tangerine/)

* Declare a release is being organised, block merging to master
* Have a release manager run `yarn changeset bump`
* PR the changes from this script back into master - get a review of changelogs, and packages will be published
* Once merged, re-pull master, manually run `yarn release`, push tags
* Let everyone know it's safe to merge PRs again

yarn changeset release
yarn release
