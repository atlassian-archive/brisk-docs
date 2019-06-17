const path = require('path');

module.exports = () => ({
  packages: path.join(__dirname, 'typescript-package'),
  docs: { path: path.join(__dirname, 'docs'), name: 'docs' },
  siteName: 'Typescript/webpack Test Docs',
});
