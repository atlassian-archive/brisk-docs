const path = require('path');

const webpack = config => {
  config.module.rules.push({
    test: new RegExp(`${__dirname}/.*\\.tsx$`),
    loader: 'babel-loader!ts-loader',
  });

  return config;
};

module.exports = () => ({
  packages: path.join(__dirname, 'typescript-package'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Typescript/webpack Test Docs',
  webpack,
});
