const fse = require('fs-extra');
const path = require('path');

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
  presets: ['@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/syntax-dynamic-import',
  ],
};

if (
  cwd !== __dirname &&
  clientBabelConfig &&
  fse.existsSync(path.resolve(cwd, clientBabelConfig))
) {
  /* eslint-disable global-require */
  /* eslint-disable import/no-dynamic-require */
  const clientBabel = require(path.resolve(cwd, clientBabelConfig));
  babelConfig = clientBabel;
} else if (loadBabel) {
  babelConfig = loadBabel(babelConfig);
}

module.exports = babelConfig;
