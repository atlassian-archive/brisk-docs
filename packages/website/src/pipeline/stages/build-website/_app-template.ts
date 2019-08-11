import outdent from 'outdent';

export default (allPages: Array<string>) => {
  const routes = allPages.map(
    page =>
      `<Route path="${
        page.split('.')[0]
      }" component={import("pages${page}")} />`,
  );

  return outdent`
    import React from 'react';
    import { BrowserRouter as Router, Switch, Route } from "react-router";

    export default () => (
        <Router>
            <Switch>
                ${routes.join('\n      ')}
            </Switch>
        </Router>
    );`;
};
