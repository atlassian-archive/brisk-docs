const resolve = require('resolve');

// NOTE: This function comes from here https://github.com/zeit/next.js/blob/a6ddaefe226b7ecf8d984244f82114df7e12c909/packages/next/build/webpack-config.ts#L77
// with an addition that atlaskit components are also always transpiled. This is because atlaskit components currently
// do not have a commonjs export. We have otherwise entirely copied the contents so that we gain the other benefits of
// this.

module.exports = (cwd, name, target) =>
  name === 'server' && target !== 'serverless'
    ? [
        // eslint-disable-next-line consistent-return
        (context, request, callback) => {
          const notExternalModules = [
            'next/app',
            'next/document',
            'next/link',
            'next/router',
            'next/error',
            'string-hash',
            'hoist-non-react-statics',
            'htmlescape',
            'next/dynamic',
            'next/constants',
            'next/config',
            'next/head',
          ];

          if (notExternalModules.indexOf(request) !== -1) {
            return callback();
          }

          resolve(
            request,
            { basedir: cwd, preserveSymlinks: true },
            // eslint-disable-next-line consistent-return
            (err, res) => {
              if (err) {
                return callback();
              }

              if (!res) {
                return callback();
              }

              if (res.match(/@atlaskit/)) {
                return callback();
              }
              if (res.match(/@brisk-docs/)) {
                return callback();
              }

              // Default pages have to be transpiled
              if (
                res.match(/next[/\\]dist[/\\]/) ||
                res.match(/node_modules[/\\]@babel[/\\]runtime[/\\]/) ||
                res.match(/node_modules[/\\]@babel[/\\]runtime-corejs2[/\\]/)
              ) {
                return callback();
              }

              // Webpack itself has to be compiled because it doesn't always use module relative paths
              if (
                res.match(/node_modules[/\\]webpack/) ||
                res.match(/node_modules[/\\]css-loader/)
              ) {
                return callback();
              }

              // styled-jsx has to be transpiled
              if (res.match(/node_modules[/\\]styled-jsx/)) {
                return callback();
              }

              if (res.match(/node_modules[/\\].*\.js$/)) {
                return callback(undefined, `commonjs ${request}`);
              }

              callback();
            },
          );
        },
      ]
    : [];
