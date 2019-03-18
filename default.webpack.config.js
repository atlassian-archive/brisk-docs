module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          root: __dirname,
        },
      },
    ],
  },
};
