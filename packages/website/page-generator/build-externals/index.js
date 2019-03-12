const path = require('path');
const crypto = require('crypto');
const webpack = require('webpack');

const createBuilder = (inputs, destinationDir, config) => {
  const bundles = inputs.map(input => {
    const basename = path.basename(input);
    const hash = crypto
      .createHash('md5')
      .update(input)
      .digest('hex');
    const id = `${basename}_${hash}`;

    return { id, source: input, dest: path.join(destinationDir, `${id}.js`) };
  });

  const entry = bundles.reduce(
    (acc, bundle) => ({ ...acc, [bundle.id]: bundle.source }),
    {},
  );

  const output = {
    filename: '[name].js',
    path: destinationDir,
    libraryTarget: 'commonjs2',
  };

  const compiler = webpack({ ...config, entry, output });

  return {
    run: () =>
      new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          if (err) {
            reject(err);
          }

          const info = stats.toJson();

          if (stats.hasErrors()) {
            // eslint-disable-next-line no-console
            console.error(info.errors);
            reject(new Error('errors occurred during compilation'));
          } else if (stats.hasWarnings()) {
            // eslint-disable-next-line no-console
            console.warn(info.warnings);
          } else {
            resolve(bundles);
          }
        });
      }),
  };
};

module.exports = createBuilder;
