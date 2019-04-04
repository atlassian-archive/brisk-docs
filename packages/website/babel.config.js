const cwd = process.env.DOCS_WEBSITE_CWD;

module.exports = {
  extends: `${cwd}/babel.config.js`, // to merge the consumer level babel.config
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
