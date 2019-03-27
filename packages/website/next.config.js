const webpack = require('webpack');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const withCSS = require('@zeit/next-css');

const handleConfig = require('./bin/handle-config');

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD || process.cwd();

const { webpack: clientWebpack } = handleConfig(cwd, configPath);

module.exports = withCSS(
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
    webpack(config) {
      // eslint-disable-next-line no-param-reassign
      config.externals = [];

      // Adding items to globalScope in the website
      config.plugins.push(
        new webpack.ProvidePlugin({ Props: ['pretty-proptypes', 'default'] }),
      );

      return clientWebpack(config);
    },
  }),
);
