const webpack = {
  entry: './src/index.js',
  output: {
    filename: 'target/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
};

module.exports = webpack;
