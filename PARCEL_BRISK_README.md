# Contributing to Parcel/Brisk integration

1. After cloning this repo, run `yarn && bolt`.
2. Clone a recent copy of [Parcel 2 (typically the `v2` branch)](https://github.com/parcel-bundler/parcel/tree/v2)
3. Since [`yarn link` does not currently work with scoped packages](https://github.com/yarnpkg/yarn/issues/5083), manually create symlinks
   from brisk to parcel. First, `cd` to the root of the Brisk repo. Then, create symlinks to both `@parcel/core` and `@parcel/config-default`:
   1. ln -s \$HOME/src/parcel/packages/core/core node_modules/@parcel/core
   2. ln -s \$HOME/src/parcel/packages/configs/default node_modules/@parcel/config-default
4. In the Parcel repo, perform a build with `yarn build`. **Any changes to Parcel source will require a build to be reflected**.
5. Run the demo site with `yarn dev`
6. Load the entry page by navigating to `http://localhost:3001`
