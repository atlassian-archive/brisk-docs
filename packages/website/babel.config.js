const fse = require('fs-extra');
const path = require('path');
const merge = require('babel-merge');

const handleConfig = require('./handle-config').default;

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD;

if (!cwd) {
  throw new Error('DOCS_WEBSITE_CWD is not defined');
}

const { babelConfig: clientBabelConfig, loadBabel } = handleConfig(
  cwd,
  configPath,
);


let babelConfig = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'emotion',
      {},
      'website'
    ],
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
      'website'
    ],
    [
      '@babel/proposal-class-properties',
      {},
      'website'
    ],
    [
      '@babel/proposal-object-rest-spread',
      {},
      'website'
    ],
    [
      '@babel/transform-runtime',
      {},
      'website'
    ],
    [
      'transform-dynamic-import',
      {},
      'website'
    ]
  ],
};

// to merge the consumer level babel.config
// condition required to support dev testing of our website which otherwise throws Configuration cycle detected loading error.
// if the consumer provides a babel.config extend here
if (
  cwd !== __dirname &&
  clientBabelConfig &&
  fse.existsSync(path.resolve(cwd, clientBabelConfig))
) {
  /* eslint-disable global-require */
  /* eslint-disable import/no-dynamic-require */
  const clientBabel = require(path.resolve(cwd, clientBabelConfig));
  babelConfig = merge(babelConfig, clientBabel);
} else if (loadBabel) {
  // option to pass the required babel configs as function suppose the above scenario is not supported for a consumer.
  babelConfig = loadBabel(babelConfig);
}

module.exports = babelConfig;
