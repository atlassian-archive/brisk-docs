/*
Only plugins can export async functions, so we are nesting our config like so
*/
const path = require('path');
const handleConfig = require('@brisk-docs/gatsby-generator/handle-config')
  .default;
const getPkgDir = require('pkg-dir');

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const briskPkgPath = getPkgDir.sync(
  require.resolve('@brisk-docs/gatsby-generator'),
);

const config = handleConfig(briskPkgPath, configPath);

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(briskPkgPath, 'pages/'),
      },
    },
    {
      resolve: require.resolve(`gatsby-plugin-page-creator`),
      options: {
        path: `${briskPkgPath}/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteName,
        short_name: config.siteName,
        start_url: '/',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'browser',
        // TODO: get favicons working again
        icon: config.favicon
          ? config.favicon
          : path.resolve(__dirname, 'static/skier.png'),
      },
    },
  ],
};
