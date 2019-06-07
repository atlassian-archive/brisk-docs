const path = require('path');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: { path: path.join(__dirname, 'docs'), name: 'docs', urlPath: 'docs' },
  siteName: 'Dummy Data Docs',
});
