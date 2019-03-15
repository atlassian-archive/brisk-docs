const path = require('path');
const webpackConfiguration = require('./webpack.config');

module.exports = () => ({
  packages: path.join(__dirname, 'typescript-package'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Typescript/webpack Test Docs',
  webpackConfiguration,
});
