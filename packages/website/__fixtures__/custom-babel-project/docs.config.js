const path = require('path');
const webpackConfiguration = require('./webpack.config');

module.exports = () => ({
  packages: path.join(__dirname, 'weird-babel-package'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Babel/webpack Test Docs',
  webpackConfiguration,
});
