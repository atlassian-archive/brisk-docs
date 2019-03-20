const path = require('path');
const webpackConfiguration = require('./webpack.config');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Webpack Test Docs',
  webpackConfiguration,
});
