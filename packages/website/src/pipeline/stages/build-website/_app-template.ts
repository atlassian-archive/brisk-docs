import outdent from 'outdent';

export default (allPages: Array<string>) => {
  const routes = allPages.map(
    page =>
      `<Route path="${
        page.split('.')[0]
      }" component={import("./pages${page}")} />`,
  );

  return outdent`
    import React from 'react';
    import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router";
    import HomePage from './pages';

    export default () => (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                ${routes.join('\n      ')}
                <Redirect to='/'/>
            </Switch>
        </Router>
    );`;
};
