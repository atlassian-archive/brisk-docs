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
        validatePath: (relativePath, isValid) => {
          console.log(relativePath);
          // Filter page creation based on criteria,
          // the second argument is the default validatePath function
          if (!isValid(relativePath)) return false
          if (relativePath.indexOf("subExamples") !== -1) return false
          return true
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
  ]
}
