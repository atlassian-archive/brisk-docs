const preconstruct = require('preconstruct');

module.exports = {
  setupFiles: ['./jest-setup.js'],
  moduleNameMapper: preconstruct.aliases.jest(__dirname),
  testPathIgnorePatterns: ['./cypress/', '__fixtures__'],
  transformIgnorePatterns: ['node_modules/(?!(@atlaskit)/)'],
};
