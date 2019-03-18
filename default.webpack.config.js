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
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [['@babel/plugin-proposal-class-properties']],
        },
      },
    ],
  },
};
