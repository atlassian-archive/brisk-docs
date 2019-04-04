const cwd = process.env.DOCS_WEBSITE_CWD;

const babelConfig = {
  presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    'emotion',
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
    'transform-flow-strip-types',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
  ],
};

// to merge the consumer level babel.config
// condition required to support dev testing of our website which otherwise throws Configuration cycle detected loading error.
if (cwd !== __dirname) {
  babelConfig.extends = `${cwd}/babel.config.js`;
}

module.exports = babelConfig;
