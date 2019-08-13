import outdent from 'outdent';

export default (allPages: Array<string>) => {
  const routes = allPages.map(
    page =>
      `<Route path="${
        page.split('.')[0]
      }" component={AsyncLoadPages(import('./pages${page}'))} />`,
  );

  return outdent`
    import React from 'react';
    import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
    import { asyncComponent } from 'react-async-component';

    const AsyncLoadPages = (promise) => asyncComponent({
        resolve: () => promise,
        LoadingComponent: () => <div>Loading</div>,
        ErrorComponent:({ error }) => <div>There is an error. {error.message} </div>
    });

    

    export default () => (
        <Router>
            <Switch>
                <Route exact path='/' component={AsyncLoadPages(import('./pages'))} />
                ${routes.join('\n      ')}
                <Redirect to='/'/>
            </Switch>
        </Router>
    );`;
};

// Smoe notes: Can we change the redirect to a 404 page?
