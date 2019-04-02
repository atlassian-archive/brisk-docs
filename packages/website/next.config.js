const webpack = require('webpack');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const withCSS = require('@zeit/next-css');

const handleConfig = require('./bin/handle-config');

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD;

if (!cwd) {
  throw new Error('DOCS_WEBSITE_CWD is not defined');
}

const { webpack: clientWebpack } = handleConfig(cwd, configPath);

module.exports = withCSS(
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
    webpack(config) {
      // eslint-disable-next-line no-param-reassign
      config.externals = [];

      config.module.rules.push({
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules\/(?!@brisk-docs\/website)/, // exclude all node_modules except our website while using the loader within a consumer app.
        use: {
          loader: 'babel-loader',
        },
      });

      // Website modules should take precedence over the node_modules of the consumer.
      config.resolve.modules.push(__dirname, 'node_modules');

      // Adding items to globalScope in the website
      config.plugins.push(
        new webpack.ProvidePlugin({ Props: ['pretty-proptypes', 'default'] }),
      );

      config.resolve.extensions.push('.tsx', '.ts');

      return clientWebpack(config);
    },
  }),
);
