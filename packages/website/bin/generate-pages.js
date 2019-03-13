// This script generates pages for the packages, without moving where they are in the
// file system. It maps over all the files that we want, and generates a new file in
// pages for them, that reference back to their original location.
//
// This script needs to be run before devving starts.

const path = require('path');
const fse = require('fs-extra');

const generatePages = require('./page-generator');

module.exports = ({ packagesPaths, docsPath, useManifests }) => {
  const pagesPath = path.resolve(__dirname, './pages');
  const componentsPath = path.resolve(__dirname, './components/page-templates');

  const pagesList = generatePages(
    packagesPaths,
    docsPath,
    pagesPath,
    componentsPath,
    {
      useManifests,
    },
  );
  const { packages, docs, metaData } = pagesList;

  fse.writeFileSync(
    path.resolve(__dirname, 'data/pages-list.json'),
    JSON.stringify({ packages, docs }, undefined, 2),
  );

  fse.writeFileSync(
    path.resolve(__dirname, 'data/packages-data.json'),
    JSON.stringify({ metaData }, undefined, 2),
  );
};