const path = require('path');

const webpack = config => {
  config.module.rules.push({
    test: new RegExp(`${__dirname}/.*\\.(js|jsx)$`),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        root: __dirname,
      },
    },
  });
  return config;
};

module.exports = () => ({
  packages: path.join(__dirname, 'weird-babel-package'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Babel/webpack Test Docs',
  webpack,
});
