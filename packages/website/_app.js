import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

const AsyncLoadPages = promise =>
  asyncComponent({
    resolve: () => promise,
    LoadingComponent: () => <div>Loading</div>,
    ErrorComponent: ({ error }) => (
      <div>There is an error. {error.message} </div>
    ),
  });

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncLoadPages(import('./pages'))} />
      <Route
        path="/healthcheck"
        component={AsyncLoadPages(import('./pages/healthcheck.tsx'))}
      />
      <Route
        path="/index"
        component={AsyncLoadPages(import('./pages/index.tsx'))}
      />
      <Route
        path="/packages"
        component={AsyncLoadPages(import('./pages/packages.tsx'))}
      />
      <Route
        path="/readme"
        component={AsyncLoadPages(import('./pages/readme.js'))}
      />
      <Redirect to="/" />
    </Switch>
  </Router>
);
