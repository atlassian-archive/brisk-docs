// This script generates pages for the packages, without moving where they are in the
// file system. It maps over all the files that we want, and generates a new file in
// pages for them, that reference back to their original location.
//
// This script needs to be run before devving starts.

const path = require('path');
const fs = require('fs-extra');

const generatePages = require('./page-generator');
const generateExtensionsList = require('./generate-extensions-list');

const packageRoot = path.resolve(__dirname, '..', '..');

module.exports = async ({
  packagesPaths,
  docsList,
  useManifests,
  webpackConfiguration,
  showExamples,
  showSubExamples,
  siteName,
  packagesDescription,
  readMePath,
  customPackageFields,
  extensions,
}) => {
  const componentsPath = path.resolve(
    packageRoot,
    './src/components/page-templates',
  );

  const { ...rest } = docsList;

  const pagesList = await generatePages(
    packagesPaths,
    docsList,
    packageRoot,
    componentsPath,
    {
      useManifests,
      webpackConfiguration,
      showSubExamples,
      showExamples,
      customPackageFields,
    },
    readMePath,
  );

  const { packages, metaData, ...rests } = pagesList;

  const pagesListPath = path.resolve(packageRoot, 'data/pages-list.json');
  const packagesDataPath = path.resolve(packageRoot, 'data/packages-data.json');
  const metaPath = path.resolve(packageRoot, 'data/site-meta.json');
  const extensionsPath = path.resolve(packageRoot, 'data/extensions-list.js');

  fs.ensureFileSync(pagesListPath);
  fs.writeFileSync(
    pagesListPath,
    JSON.stringify({ packages, ...rests }, undefined, 2),
  );

  fs.ensureFileSync(packagesDataPath);
  fs.writeFileSync(
    packagesDataPath,
    JSON.stringify({ metaData }, undefined, 2),
  );
  fs.writeFileSync(
    metaPath,
    JSON.stringify({ siteName, packagesDescription, ...rest }, undefined, 2),
  );

  fs.writeFileSync(extensionsPath, generateExtensionsList(extensions || []));
};
