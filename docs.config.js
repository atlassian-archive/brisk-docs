const defaultWebpackConfig = require('./default.webpack.config');

module.exports = () => ({
  docs: './packages/website/docs',
  packages: ['./packages/*'],
  useManifests: false,
  webpackConfiguration: defaultWebpackConfig,
  siteName: 'Brisk Docs Docs',
});
