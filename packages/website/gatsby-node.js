const funAliases = require('/Users/clee/Thinkmill/projects/atlaskit/website/relevant-file-name.json');

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.ts', '.tsx'],
      alias: funAliases,
    },
  });
  const config = getConfig();

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/),
    ),
    // Recreate it with custom exclude filter
    {
      // Called without any arguments, `loaders.js` will return an
      // object like:
      // {
      //   options: undefined,
      //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
      // }
      // Unless you're replacing Babel with a different transpiler, you probably
      // want this so that Gatsby will apply its required Babel
      // presets/plugins.  This will also merge in your configuration from
      // `babel.config.js`.
      ...loaders.js(),
      test: /\.jsx?$/,
      // Exclude all node_modules from transpilation, except for 'swiper' and 'dom7'
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
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};

// const funAliases = require('/Users/bconolly/Development/atlaskit/website/relevant-file-name.json');

// exports.onCreateWebpackConfig = async ({ actions, loaders }) => {
//   console.log(loaders);
//   actions.setWebpackConfig({
//     resolve: {
//       mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
//       extensions: ['.js', '.ts', '.tsx'],
//       alias: funAliases,
//     },
//     module: {
//       rules: [
//         {
//           test: /(\.js|\.ts|\.tsx|\.jsx)$/,
//           include: /node_modules\/@brisk-docs/,
//           exclude: /node_modules\/@brisk-docs\/website\/node_modules/,
//           loader: 'babel-loader',
//         },
//       ],
//     },
//   });
// };
