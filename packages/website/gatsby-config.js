/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require('path');

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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(process.cwd(), '..', '..', '..'),
        // This syntax matches all FILES that are not .md, but does not match on folders
        // If it matches on folders, this plugin does not run successfully
        ignore: ['**/.cache/**/*', '**/*.!(mdx)'],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
  ],
};
