const handleConfig = require('./handle-config').default;

const configPath = process.env.DOCS_WEBSITE_CONFIG_PATH;
const cwd = process.env.DOCS_WEBSITE_CWD;

if (!cwd) {
  throw new Error('DOCS_WEBSITE_CWD is not defined');
}

const { gatsbyNode } = handleConfig(cwd, configPath);

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/),
    ),
    // Recreate it with custom exclude filter
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        /*
          What this regex is saying is:
          Do not exclude:
            - files in node_modules
            - that are in a @brisk-docs scoped package
            - BUT still exclude things in the node_modules of that package
        */
        !/node_modules\/@brisk-docs\/[^/]+\/(?!node_modules)/.test(modulePath),
    },
  ];
  actions.replaceWebpackConfig(config);
};

/*
This map is being used TEMPORARILY because our project is not yet enough gatsby-like to use layered
gatsby-node instances (the way gatsby plugins would), but we still need to allow users to provide this
info.
*/
Object.entries(gatsbyNode).forEach(([key, value]) => {
  exports[key] = value;
});
