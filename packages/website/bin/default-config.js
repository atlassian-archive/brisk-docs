const identityFunc = require('lodash.identity');

module.exports = {
  docs: './docs',
  packages: ['./packages/*'],
  useManifests: false,
  siteName: 'Brisk Docs',
  webpack: identityFunc,
  showSubExamples: false,
};
