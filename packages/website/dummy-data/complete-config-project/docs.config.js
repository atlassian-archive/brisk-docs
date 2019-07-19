const path = require('path');

module.exports = () => ({
  customPackageFields: ['author', 'dependencies'],
  docs: [
    {
      path: path.join(__dirname, 'docs'),
      name: 'Docs',
      description: 'Read the full documentation for this project',
      urlPath: 'docco',
    },
    {
      path: path.join(__dirname, 'tutorial'),
      description: 'Get started by following a tutorial',
      name: 'Tutorial',
      urlPath: 'tut',
    },
  ],
  favicon: path.join(__dirname, 'favicon.ico'),
  packages: [
    path.join(__dirname, 'packages', '*'),
    path.join(__dirname, 'otherpackages', '*'),
  ],
  packagesDescription: 'A custom description for the packages section',
  siteName: 'Complete Config Project',
  showExamples: true,
  showSubExamples: true,
  webpack: config => {
    config.module.rules.push({
      test: /.txt$/,
      use: ['raw-loader'],
    });
    return config;
  },
  readMePath: path.join(__dirname, 'index.md'),
});
