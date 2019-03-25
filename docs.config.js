const test = file => {
  const nextServerFiles = new RegExp(`^${__dirname}/packages/website/`);
  const sourceFiles = /\.(ts|tsx|js|jsx)$/;
  return file.match(sourceFiles) && !file.match(nextServerFiles);
};

const webpack = config => {
  config.module.rules.push({
    test,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      root: __dirname,
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

module.exports = () => ({
  docs: './packages/website/docs',
  packages: ['./packages/*'],
  useManifests: false,
  webpack,
  siteName: 'Brisk Docs Docs',
});
