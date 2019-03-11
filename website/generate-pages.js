// This script generates pages for the packages, without moving where they are in the
// file system. It maps over all the files that we want, and generates a new file in
// pages for them, that reference back to their original location.
//
// This script needs to be run before devving starts.
//
// TODO: This script currently won't remove dead pages. We need to write a second script
// that will make sure these are 1:1 lists
// separating the package JSON data into a different file.

const path = require('path');
const fse = require('fs-extra');
const commandLineArgs = require('command-line-args');

const processConfig = require('./process-config');
const generatePages = require('./page-generator');

const cwd = process.cwd();

const cliOptions = [{ name: 'config', type: String }];
const args = commandLineArgs(cliOptions, { camelCase: true });

const loadConfig = () => {
    if (args.config) {
        const configPath = path.resolve(cwd, args.config);
        return JSON.parse(fse.readFileSync(configPath, 'utf-8'));
    }

    return {};
};

const { packagesPaths, docsPath, useManifests } = processConfig(cwd, loadConfig());

const pagesPath = path.resolve(__dirname, './pages');
const componentsPath = path.resolve(__dirname, './components/page-templates');

const pagesList = generatePages(packagesPaths, docsPath, pagesPath, componentsPath, {
    useManifests,
});
const { packages, docs, metaData } = pagesList;

fse.writeFileSync(
    path.resolve(__dirname, 'data/pages-list.json'),
    JSON.stringify({ packages, docs }, undefined, 2),
);

fse.writeFileSync(
    path.resolve(__dirname, 'data/packages-data.json'),
    JSON.stringify({ metaData }, undefined, 2),
);
