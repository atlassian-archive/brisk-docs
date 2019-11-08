/*
Only plugins can export async functions, so we are nesting our config like so
*/
const path = require('path');
const handleConfig = require('./handle-config').default;

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD;

if (!cwd) {
  throw new Error('DOCS_WEBSITE_CWD is not defined');
}

const config = handleConfig(cwd, configPath);

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
        path: path.resolve(__dirname, 'pages/'),
      },
    },
    {
      resolve: require.resolve(`gatsby-plugin-page-creator`),
      options: {
        path: `${__dirname}/pages`,
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
        icon: config.favicon,
      },
    },
  ],
};
