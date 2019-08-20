import { UserConfig } from '../common/configuration-options';

// const identityFunc = require('lodash.identity');

// type FilledConfig =

const defaultConfig: UserConfig = {
  docs: {
    path: './docs',
    name: 'Docs',
    description: 'View the documentation for this project',
  },
  links: [],
  packages: ['./packages/**/*'],
  siteName: 'Brisk Docs',
  // webpack: identityFunc,
  // showSubExamples: false,
  packagesDescription: 'View documentation about individual packages',
  customPackageFields: ['license', 'maintainers', 'name', 'version'],
};

export default defaultConfig;
