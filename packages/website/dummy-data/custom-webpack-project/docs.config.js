const path = require('path');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: path.join(__dirname, 'docs'),
  siteName: 'Webpack Test Docs',
});
