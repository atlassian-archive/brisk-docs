const fs = require('fs-extra');
const path = require('path');

const handleConfig = require('./handle-config');
const generatePages = require('./generate-pages');
const createParcelServer = require('./parcel-server');

const cwd = process.cwd();
const staticRoot = path.resolve(__dirname, '..', '..', 'static');

const loadFavicon = async config => {
  const faviconPath =
    config.favicon || path.resolve(staticRoot, 'favicon.ico.default');
  fs.copy(faviconPath, path.resolve(staticRoot, 'favicon.ico'));
};

const prepare = async configPath => {
  const config = handleConfig(cwd, configPath);
  await loadFavicon(config);
  await generatePages(config);
  return config;
};

const dev = async (configPath, port) => {
  const { packagesPaths } = await prepare(configPath);
  return createParcelServer({
    port,
    staticRoot,
    packagesPaths,
    pagesRoot: path.resolve(cwd, 'pages'),
  });
};

const build = async () => {
  throw new Error('not implemented');
};

const start = async () => {
  throw new Error('not implemented');
};

const exportWebsite = async () => {
  throw new Error('not implemented');
};

module.exports.dev = dev;
module.exports.build = build;
module.exports.start = start;
module.exports.exportWebsite = exportWebsite;
