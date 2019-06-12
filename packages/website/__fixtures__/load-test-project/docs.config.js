const path = require('path');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: { path: path.join(__dirname, 'docs'), name: 'docs' },
  siteName: 'Load Test Docs',
});
