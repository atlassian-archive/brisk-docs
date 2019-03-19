const webpack = require('webpack');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack(config) {
      // eslint-disable-next-line no-param-reassign
      config.externals = [];
      // Need to apply next.js webpack to jira-frontend src modules
      config.module.rules.forEach(
        rule =>
          rule.include &&
          rule.include.push(path.join(__dirname, `../packages`)),
      );

      // Adding items to globalScope in the website
      config.plugins.push(
        new webpack.ProvidePlugin({ Props: ['pretty-proptypes', 'default'] }),
      );

      // Needed to make sure jira-frontend src alias are found by webpack
      config.resolve.modules.push(path.join(__dirname, `../packages`));
      return config;
    },
  }),
);
