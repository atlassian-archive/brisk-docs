const path = require('path');
const fse = require('fs-extra');
const defaultConfig = require('./default-config');

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

/**
 * Reads a user supplied config file, validates the contents, and
 * reformats it in a normalised way
 * @param cwd
 * @param config
 * @returns {{packagesPaths: *, docsPath: *}}
 */
const processConfig = (cwd, providedConfig = {}) => {
  const config = { ...defaultConfig, ...providedConfig };
  const { docs, packages, ...rest } = config;
  const { name, description } = docs;
  const docsPath = path.resolve(cwd, docs.path);

  const packagesConfig = resolvePathsConfig(packages);
  const packagesPaths = packagesConfig.map(packagesPath =>
    path.resolve(cwd, packagesPath),
  );

  return {
    docsList: {
      docsPath,
      name,
      description,
    },
    packagesPaths,
    ...rest,
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
