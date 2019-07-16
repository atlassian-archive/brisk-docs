const identityFunc = require('lodash.identity');

module.exports = {
  docs: {
    path: './docs',
    name: 'Docs',
    description: 'View the documentation for this project',
  },
  packages: ['./packages/**/*'],
  siteName: 'Brisk Docs',
  webpack: identityFunc,
  showSubExamples: false,
  packagesDescription: 'View documentation about individual packages',
  customPackageFields: ['license', 'maintainers', 'name', 'version'],
};
