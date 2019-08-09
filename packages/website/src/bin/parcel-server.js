const Parcel = require('@parcel/core').default;
const express = require('express');
const path = require('path');

const configPath = require.resolve('@parcel/config-default');
const defaultConfig = {
  // eslint-disable-next-line global-require
  ...require('@parcel/config-default'),
  filePath: configPath,
};

const DIST_DIR = path.resolve('.dist');
const builtEntryPage = path.resolve(DIST_DIR, 'index.html');

module.exports = async function createParcelServer({
  port,
  pagesRoot,
  staticRoot,
}) {
  const parcelWatchSubscription = await new Parcel({
    entries: [path.resolve(__dirname, '..', '..', 'index.html')],
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
  }).watch();

  const app = express();
  app.set('view engine', 'ejs');
  app.use(express.static(DIST_DIR));
  app.use('/static', express.static(staticRoot));

  app.get('*', async (_, res) => {
    res.sendFile(builtEntryPage);
  });

  const server = app.listen(port != null ? port : 3001);
  return {
    async dispose() {
      // `close` is on the returned server object, not on `app`.
      // https://stackoverflow.com/questions/8659011/how-do-i-programmatically-shut-down-an-instance-of-expressjs-for-testing
      server.close();
      await parcelWatchSubscription.unsubscribe();
    },
  };
};
