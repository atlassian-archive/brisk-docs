module.exports = {
  presets: ['@babel/flow', '@babel/preset-env', '@babel/react', '@babel/preset-typescript'],
  plugins: [
    'emotion',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
    'transform-dynamic-import',
  ],
};
