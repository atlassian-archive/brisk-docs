module.exports = {
  mode: 'development',
  resolve: {
    // Add `.tsx` as a resolvable extension.
    extensions: ['.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
