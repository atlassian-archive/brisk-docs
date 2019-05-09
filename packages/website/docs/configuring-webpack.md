# Customising the webpack config

If your project needs special build configurations to run your code it's possible to pass these options
to Brisk Docs so that your components can be displayed within the website.

This is done by adding a function into your `docs.config.js` file, e.g.

```js
// docs.config.js
module.exports = () => ({
  webpack: config => {
    // Add support for importing Sass files
    config.module.rules.push({
      test: /\.scss?$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    return config;
  },
});
```

The first argument provided to your function is a [webpack configuration](https://webpack.js.org/configuration) object that you can extend. The returned configuration is then used to build the website.

Hi, this sentence should not have been merged in to master. Go tsk at Ben Conolly if you see this: [zelda](../Something/README.md)
