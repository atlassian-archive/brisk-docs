/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client.js',
  // output : {
  //     path : path.resolve(__dirname , 'dist'),
  //     filename: 'index_bundle.js'
  // },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      // { test: /\.(js|ts|jsx|tsx)$/, use: 'babel-loader' },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: 'commonjs' }],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime',
              ],
            },
          },
        ],
      },
      {
        test: /\.md(x?)?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      // { // This caused issue with the types in the /typings folder not being identified by the ts-loader. Moving the typings folder form root to /websites fixed part of issue but still flaky.  Hence used babel-loader instead
      //   test: /\.ts(x?)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "ts-loader"
      //     }
      //   ]
      // },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
