const express = require('express');
const next = require('next');
const getPackageInfo = require('./generate-pages/get-package-info');

const packageInfo = getPackageInfo();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get('/packages', (req, res) => {
            // Show a list of all packages, with links to their page
            const packageIds = packageInfo.map(({ id }) => id);

            app.render(req, res, '/packages', { packageList: packageIds });
        });
        server.get('/packages/:id', (req, res) => {
            // it should search in packageInfo to see if you have the package
            // If yes, show the package name, a link to the first example, and a link to all docs pages
            // If no, show a 404 page
            app.render(req, res, '/404', {});
        });

        // TODO: Decide where this goes/what lives here
        // server.get('/packages:/name/docs', (req, res) => {});
        server.get('/packages:/id/docs/:docId', (req, res) => {
            // it should search in package's docs array to see if you have the page requested
            // If yes, show the package name and docs Id
            // If no, show a 404 page
            app.render(req, res, '/404', {});
        });

        // TODO: Decide where this goes/what lives here
        // server.get('/packages:/name/examples', (req, res) => {});
        server.get('/packages:/name/examples/:exampleId', (req, res) => {
            // it should search in package's docs array to see if you have the page requested
            // If yes, show the package name and docs Id
            // If no, show a 404 page
            app.render(req, res, '/404', {});
        });

        server.get('/home/:name', (req, res) => {
            const actualPage = '/home';
            const queryParams = { name: req.params.name };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3001');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
