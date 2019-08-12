import outdent from 'outdent';

export default (allPages: Array<string>) => {
  const routes = allPages.map(
    page =>
      `<Route path="${
        page.split('.')[0]
      }" component={() => <HackyLoader promise={import("./pages${page}")} />} />`,
  );

  return outdent`
    import React, { useState } from 'react';
    import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

    const HackyLoader = ({ promise }) => {
      const [Comp, setComp] = useState(null);
      promise.then(res => setComp(res));
      if (Comp) return <Comp.default />;
      return <div>Loading</div>;
    };
    

    export default () => (
        <Router>
            <Switch>
                <Route exact path='/' component={() => <HackyLoader promise={import("./pages")} />}/>
                ${routes.join('\n      ')}
                <Redirect to='/'/>
            </Switch>
        </Router>
    );`;
};

// Smoe notes: Can we change the redirect to a 404 page?
