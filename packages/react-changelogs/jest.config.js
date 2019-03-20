module.exports = {
  setupFiles: ['./test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
