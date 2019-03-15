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
        test: /.tsx?$/,
        loader: 'babel-loader!ts-loader',
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
