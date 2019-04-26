module.exports = {
  setupFiles: ['./jest-setup.js'],
  testPathIgnorePatterns: ['./cypress/', '__fixtures__'],
  transformIgnorePatterns: ['node_modules/(?!(@atlaskit)/)'],
};
