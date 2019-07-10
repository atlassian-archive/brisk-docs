const path = require('path');
const badExtension = require('../bad-example-extension');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: [
    {
      path: path.join(__dirname, 'docs'),
      name: 'Project docs',
      // Override the default url path which is derived from cwd
      urlPath: 'docs',
    },
  ],
  siteName: 'Dummy Data Docs',
  favicon: path.join(__dirname, 'favicon.ico'),
  extensions: [badExtension],
});
