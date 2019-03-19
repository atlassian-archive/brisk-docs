module.exports = {
  setupFiles: ['./jest-setup.js'],
  testPathIgnorePatterns: ['./cypress/'],
  transformIgnorePatterns: ['node_modules/(?!(@atlaskit)/)'],
};
