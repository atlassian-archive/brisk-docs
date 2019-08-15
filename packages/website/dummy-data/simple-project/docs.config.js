const path = require('path');

module.exports = () => ({
  packages: path.join(__dirname, 'packages', '*'),
  docs: [
    {
      path: path.join(__dirname, 'docs'),
      name: 'Project docs',
      // Override the default url path which is derived from cwd
      urlPath: 'docs',
    },
    {
      path: path.join(__dirname, 'guidelines'),
      name: 'Project Guides',
      // Override the default url path which is derived from cwd
      urlPath: 'guidelines',
    },
  ],
  siteName: 'Dummy Data Docs',
  favicon: path.join(__dirname, 'favicon.ico'),
});
