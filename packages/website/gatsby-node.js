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
          The logic for the below two regexes + boolean is we want to include things in @brisk-docs/website, but exclude things in its node_modules.
          This is complicated by the fact that we must do this by the exclude list, making it a double negative
        */
        !(
          /node_modules\/@brisk-docs\/website/.test(modulePath) &&
          !/node_modules\/@brisk-docs\/website\/node_modules/.test(modulePath)
        ),
    },
  ];
  actions.replaceWebpackConfig(config);
};

Object.entries(gatsbyNode).forEach(([key, value]) => {
  exports[key] = value;
});
