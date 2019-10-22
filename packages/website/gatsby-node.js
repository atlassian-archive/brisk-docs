exports.onCreateWebpackConfig = async ({
  resolve,
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      // mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.ts', '.tsx'],
    }
  })
}