/*
I want to be clear up front this file shouldn't be here and is a hack to work around some
annoying problems.

We refactored a lot of the codebase to get a clearer distinction between the steps that
brisk embarks on, while at the same time converting much of the code to typescript, and
adding a build process for these steps, with the intent to stop publishing the `src` directory

The `handle-config` function is used awkwardly by the `babel.config.js` and the `next.config.js`
files. Ideally, the resolved config should be passed to these.

To avoid a rabbit hole of further refactoring, I made handle-config its own entry point.
*/

import handleConfig from '../pipeline/stages/get-configuration/handle-config';

export default handleConfig;
