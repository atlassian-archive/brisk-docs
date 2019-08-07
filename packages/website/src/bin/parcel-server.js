/* eslint-disable no-restricted-syntax */
const Parcel = require('@parcel/core').default;
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const extensions = ['.tsx', '.ts', '.js'];

const configPath = require.resolve('@parcel/config-default');
const defaultConfig = {
  // eslint-disable-next-line global-require
  ...require('@parcel/config-default'),
  filePath: configPath,
};

const DIST_DIR = path.resolve('.dist');

// Resolve ourselves since we need to quickly determine whether the page exists
async function resolve(pagesRoot, request) {
  const base = path.resolve(
    pagesRoot,
    request.slice(1), // remove the leading `/`
  );
  if (!base.startsWith(pagesRoot)) {
    // Do not resolve anything outside the pages root.
    return;
  }

  for (const basename of [base, path.join(base, 'index')]) {
    for (const extension of extensions) {
      const filePath = basename + extension;
      try {
        // eslint-disable-next-line no-await-in-loop
        await fs.stat(filePath);
        // eslint-disable-next-line consistent-return
        return filePath;
      } catch (e) {
        // continue
      }
    }
  }
}

module.exports = async function createParcelServer({
  port,
  pagesRoot,
  staticRoot,
}) {
  const app = express();
  app.set('view engine', 'ejs');
  app.use(express.static(DIST_DIR));
  app.use('/static', express.static(staticRoot));
  const pageToBundles = new Map();

  app.get('*', async (req, res) => {
    const pagePath = await resolve(pagesRoot, req.url);
    if (pagePath == null) {
      res.sendStatus(404);
      return;
    }

    let bundlePaths = pageToBundles.get(pagePath);
    if (bundlePaths == null) {
      // TODO: Handle multiple concurrent parcels during multiple requests
      const bundleGraph = await new Parcel({
        entries: [pagePath, path.resolve(__dirname, '../_app.js')],
        defaultConfig,
        killWorkers: false,
        sourceMaps: false,
        targets: {
          main: {
            distDir: DIST_DIR,
            engines: {
              browsers: ['last 1 Chrome version'],
            },
            publicUrl: '/',
          },
        },
      }).run();

      const bundles = bundleGraph.getBundles();
      const pageBundle = bundles.find(b => b.isEntry && b.type === 'js');

      // TODO: Currently Pacel creates shared bundles for entry points, and the resulting
      //       bundles are not entries but belong to the same bundle group as entries.
      const otherEntryBundles = bundleGraph
        .getBundlesInBundleGroup(
          bundleGraph.getBundleGroupsContainingBundle(pageBundle)[0],
        )
        .filter(b => b.id !== pageBundle.id);

      const entries = otherEntryBundles.concat(
        bundleGraph.getBundles().filter(b => b.isEntry && b.type === 'js'),
      );

      if (entries.length < 2) {
        throw new Error('Expected page entry and app');
      }

      bundlePaths = {
        pageEntryAsset: pageBundle.getEntryAssets()[0].id,
        scripts: entries.map(e => e.filePath),
        stylesheets: bundles
          .filter(b => b.isEntry && b.type === 'css')
          .map(b => b.filePath),
      };
      pageToBundles.set(pagePath, bundlePaths);
    }

    console.log('entry', req.url, pagePath, bundlePaths.pageEntryAsset);

    res.render('page', {
      pageEntryAsset: bundlePaths.pageEntryAsset,
      scripts: bundlePaths.scripts.map(bundlePath =>
        path.posix.relative(DIST_DIR, bundlePath),
      ),
      stylesheets: bundlePaths.stylesheets.map(bundlePath =>
        path.posix.relative(DIST_DIR, bundlePath),
      ),
    });
  });

  const server = app.listen(port != null ? port : 3001);
  return {
    dispose() {
      // `close` is on the returned server object, not on `app`.
      // https://stackoverflow.com/questions/8659011/how-do-i-programmatically-shut-down-an-instance-of-expressjs-for-testing
      server.close();
    },
  };
};
