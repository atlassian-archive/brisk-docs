const path = require('path');

const defaultDocsPath = './docs';
const defaultPackagesPaths = ['./packages'];

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
const processConfig = (cwd, config) => {
  const docsPath = path.resolve(cwd, config.docs || defaultDocsPath);

  const packagesConfig = config.packages
    ? resolvePathsConfig(config.packages)
    : defaultPackagesPaths;
  const packagesPaths = packagesConfig.map(packagesPath =>
    path.resolve(cwd, packagesPath),
  );

  const useManifests = config.useManifests || false;

  return {
    docsPath,
    packagesPaths,
    useManifests,
  };
};

module.exports = processConfig;
