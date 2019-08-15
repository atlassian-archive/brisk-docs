import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const HackyLoader = ({ promise }) => {
  const [Comp, setComp] = useState(null);
  promise.then(res => setComp(res));
  if (Comp) return <Comp.default />;
  return <div>Loading</div>;
};

export default () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        component={() => <HackyLoader promise={import('./pages')} />}
      />
    </Switch>
  </Router>
);
