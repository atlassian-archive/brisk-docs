module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
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
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
    'transform-dynamic-import',
  ],
};
