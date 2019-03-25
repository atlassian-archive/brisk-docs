const path = require('path');
const fse = require('fs-extra');

/**
 * Validates a config entry specifying a path or paths and normalises
 * it into an array of paths
 * @param entry the value of an config param
 * @returns {Array} a list of paths
 * @throws an error if the config is in an invalid format
 */
const resolvePathsConfig = entry => {
  if (typeof entry === 'string') {
    return [entry];
  }

  if (Array.isArray(entry)) {
    return entry;
  }

  throw new Error('entry must be an array or a string');
};

const defaultWebpackConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};

const defaultConfig = {
  docs: './docs',
  packages: ['./packages/*'],
  useManifests: false,
  webpackConfiguration: defaultWebpackConfig,
  showExamples: true,
};

/**
 * Reads a user supplied config file, validates the contents, and
 * reformats it in a normalised way
 * @param cwd
 * @param config
 * @returns {{packagesPaths: *, docsPath: *}}
 */
const processConfig = (cwd, providedConfig = {}) => {
  const config = { ...defaultConfig, ...providedConfig };
  const docsPath = path.resolve(cwd, config.docs);

  const packagesConfig = resolvePathsConfig(config.packages);
  const packagesPaths = packagesConfig.map(packagesPath =>
    path.resolve(cwd, packagesPath),
  );

  const { useManifests, webpackConfiguration, showExamples } = config;

  return {
    docsPath,
    packagesPaths,
    useManifests,
    webpackConfiguration,
    showExamples,
  };
};

/**
 * Handles finding the config file if it exists
 * @param cwd
 * @param providedConfigPath
 * @returns {{packagesPaths: String[], docsPath: String, useManifests: Boolean }}
 */
const loadConfig = (cwd, providedConfigPath) => {
  const defaultConfigPath = path.join(cwd, 'docs.config.js');

  let configPath;
  if (providedConfigPath) {
    configPath = path.resolve(cwd, providedConfigPath);
  } else if (fse.existsSync(defaultConfigPath)) {
    configPath = defaultConfigPath;
  }

  if (configPath) {
    // eslint-disable-next-line
    return require(configPath)();
  }
  return {};
};

const handleConfig = (cwd, config) =>
  processConfig(cwd, loadConfig(cwd, config));

module.exports = handleConfig;
// We are exporting these for testing purposes
module.exports.loadConfig = loadConfig;
module.exports.processConfig = processConfig;
