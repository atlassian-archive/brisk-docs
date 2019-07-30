const outdent = require('outdent');

/**
 * wrappedComponentTemplate - template for a page containing one
 * component wrapped is another, usually user content being wrapped
 * inside a page template component
 *
 *
 * @returns {type} source code for the page
 * @param packages
 */
const validKeys = ['homePath', 'changelogPath', 'docPath', 'examplePath'];

const getRoutes = list => {
  return list.map(
    item =>
      `<Route path='${item.pagePath}' component={() => require('./pages${
        item.pagePath
      }').default()}/>`,
  );
};

const getAllRoutes = (packages, others) => {
  const routes = [];
  packages.forEach(pkg => {
    validKeys.forEach(key =>
      routes.push(
        `<Route path='${pkg[key]}' component={() => require('./pages${
          pkg[key]
        }').default()}/>`,
      ),
    );
    // pkg.docs.forEach(doc => routes.push(`<Route path=${doc.pagePath} component=require('./pages${doc.pagePath}')/>`));
    // pkg.examples.forEach(eg => routes.push(`<Route path=${eg.pagePath} component=require('./pages${eg.pagePath}')/>`));
    routes.push(...getRoutes(pkg.docs));
    routes.push(...getRoutes(pkg.examples));
  });

  Object.keys(others).forEach(key => routes.push(...getRoutes(others[key])));
  return routes.join('\n');
};

const entryPageTemplate = (packages, others) => outdent`
  import React from 'react';
  import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
  import HomePage from './pages/index';
  
  export default () => (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          ${getAllRoutes(packages, others)}
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </>
  );
`;

module.exports = entryPageTemplate;
