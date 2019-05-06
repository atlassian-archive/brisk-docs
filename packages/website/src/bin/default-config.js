const identityFunc = require('lodash.identity');

module.exports = {
  docs: {
    path: './docs',
    name: 'Docs',
    description: 'This is a sample documentation for the website.',
  },
  packages: ['./packages/*'],
  useManifests: false,
  siteName: 'Brisk Docs',
  webpack: identityFunc,
  showSubExamples: false,
  packagesDescription: 'This is a sample package for the documentation website',
};
