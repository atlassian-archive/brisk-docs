module.exports = {
  presets: ['next/babel', '@babel/typescript'],
  plugins: [
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
  ],
};
