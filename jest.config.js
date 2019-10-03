module.exports = {
  setupFiles: ['./jest-setup.js'],
  testPathIgnorePatterns: [
    './cypress/',
    '__fixtures__',
    `.cache`,
    `public`
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  transformIgnorePatterns: [
    'node_modules/(?!(@atlaskit)/)',
    `node_modules/(?!(gatsby)/)`
  ],
  moduleFileExtensions: [
    "ts", "tsx", "js", "jsx", "json", "node"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.js',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  globals: {
    __PATH_PREFIX__: ``,
  }
};
