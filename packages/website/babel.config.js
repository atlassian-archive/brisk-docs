module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
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
