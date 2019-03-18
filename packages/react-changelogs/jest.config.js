module.exports = {
  setupFiles: ['./test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': './test-preprocessor.js',
  },
};
