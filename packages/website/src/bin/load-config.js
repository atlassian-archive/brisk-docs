const path = require('path');
const fs = require('fs-extra');

const loadConfig = (cwd, config) => {
  const defaultConfigPath = path.join(cwd, 'docs.config.js');

  let configPath;
  if (config) {
    configPath = path.resolve(cwd, config);
  } else if (fs.existsSync(defaultConfigPath)) {
    configPath = defaultConfigPath;
  }

  if (configPath) {
    // eslint-disable-next-line
    return require(configPath)();
  }
  return {};
};

module.exports = loadConfig;
