const identityFunc = require('lodash.identity');

module.exports = {
  docs: {
    path: './docs',
    name: 'Docs',
    description: 'View the documentation for this project',
  },
  packages: ['./packages/*'],
  useManifests: false,
  siteName: 'Brisk Docs',
  webpack: identityFunc,
  showSubExamples: false,
  packagesDescription: 'View documentation about individual packages',
};
