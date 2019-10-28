/*
Only plugins can export async functions, so we are nesting our config like so
*/
const path = require('path');
const findWorkspaceRoot = require('find-workspaces-root').default;

async function getConfig() {
  const wsRoot = await findWorkspaceRoot(process.cwd());

  return {
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
          path: wsRoot,
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
}

module.exports = getConfig();
