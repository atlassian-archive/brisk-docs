module.exports = {
  setupFiles: ['./jest-setup.js'],
  testPathIgnorePatterns: ['./cypress/', '__fixtures__'],
  transformIgnorePatterns: ['node_modules/(?!(@atlaskit)/)'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.js',
  },
};
