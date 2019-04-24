const webpack = require('webpack');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const getExternals = require('./next-externals');
const handleConfig = require('./src/bin/handle-config');

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD;

if (!cwd) {
  throw new Error('DOCS_WEBSITE_CWD is not defined');
}

const { webpack: clientWebpack } = handleConfig(cwd, configPath);

const babelExlude = path => {
  if (/next-server[\\/]dist[\\/]lib/.test(path)) {
    return false;
  }
  return /node_modules\/(?!@brisk-docs\/website)/.test(path);
};

module.exports = withTypescript(
  withCSS(
    withMDX({
      pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
      webpack(config) {
        // eslint-disable-next-line no-param-reassign
        config.externals = getExternals(cwd, config.name, config.target);

        // eslint-disable-next-line no-param-reassign
        delete config.devtool;

        config.module.rules.forEach(loader => {
          if (loader.use.loader === 'next-babel-loader') {
            // eslint-disable-next-line no-param-reassign
            loader.exclude = babelExlude;
          }
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
  ),
);
