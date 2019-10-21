const funAliases = require('../../../webite/relevant-file-name.js');
exports.onCreateWebpackConfig = async ({
  resolve,
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        ...funaliases,
      },
    }
  })
}