# Our Release Process

## Making Pull Requests

- run `bolt changeset` - select all packages affected by your change
- Fill out a description of the change - this will end up in the changelog
- If it was too hard to write everything in one line, go to the `.changeset/**/changes.md` file and flesh out the change. The entire markdown chunk here will be written to your changeset, so feel free to include code snippets or suggestions on how to upgrade if they are needed
    - IF IT WAS __A BREAKING CHANGE__, you should definitely do this
- It’s better to make multiple changesets, even for the same packages, to get good changelog entries, rather than trying to condense them and end up with useless changelogs

## How releases work

We currently do manual releases. Our release process looks like:

- Declare a release is being organised, block merging to master
- Have a release manager run `build-releases version`
- PR the changes from this script back into master - get a review of changelogs, and packages will be published
- Once merged, re-pull master, manually run `build-releases publish`, push tags
- Let everyone know it's safe to merge PRs again