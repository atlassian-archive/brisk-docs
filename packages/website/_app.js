import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router";
import HomePage from './pages';

export default () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path="/docs/README" component={import("./pages/docs/README.js")} />
      <Route path="/docs/guides/how-to-be-accomplished" component={import("./pages/docs/guides/how-to-be-accomplished.js")} />
      <Route path="/docs/guides/nifty-tricks/staying-at-netherfield" component={import("./pages/docs/guides/nifty-tricks/staying-at-netherfield.js")} />
      <Route path="/docs/guides/nifty-tricks" component={import("./pages/docs/guides/nifty-tricks.js")} />
      <Route path="/docs/guides" component={import("./pages/docs/guides.js")} />
      <Route path="/docs" component={import("./pages/docs.js")} />
      <Route path="/guidelines/atlDocs/nifty-tricks/staying-at-netherfield" component={import("./pages/guidelines/atlDocs/nifty-tricks/staying-at-netherfield.js")} />
      <Route path="/guidelines/atlDocs/nifty-tricks" component={import("./pages/guidelines/atlDocs/nifty-tricks.js")} />
      <Route path="/guidelines/atlDocs" component={import("./pages/guidelines/atlDocs.js")} />
      <Route path="/guidelines" component={import("./pages/guidelines.js")} />
      <Route path="/healthcheck" component={import("./pages/healthcheck.tsx")} />
      <Route path="/index" component={import("./pages/index.tsx")} />
      <Route path="/packages/mock-package-1/changelog" component={import("./pages/packages/mock-package-1/changelog.js")} />
      <Route path="/packages/mock-package-1/docs/extended-info" component={import("./pages/packages/mock-package-1/docs/extended-info.js")} />
      <Route path="/packages/mock-package-1/docs/special-usecase" component={import("./pages/packages/mock-package-1/docs/special-usecase.js")} />
      <Route path="/packages/mock-package-1/docs" component={import("./pages/packages/mock-package-1/docs.js")} />
      <Route path="/packages/mock-package-1/examples/example1" component={import("./pages/packages/mock-package-1/examples/example1.js")} />
      <Route path="/packages/mock-package-1/examples/example2" component={import("./pages/packages/mock-package-1/examples/example2.js")} />
      <Route path="/packages/mock-package-1/examples/example3" component={import("./pages/packages/mock-package-1/examples/example3.js")} />
      <Route path="/packages/mock-package-1/examples/isolated/example1" component={import("./pages/packages/mock-package-1/examples/isolated/example1.js")} />
      <Route path="/packages/mock-package-1/examples/isolated/example2" component={import("./pages/packages/mock-package-1/examples/isolated/example2.js")} />
      <Route path="/packages/mock-package-1/examples/isolated/example3" component={import("./pages/packages/mock-package-1/examples/isolated/example3.js")} />
      <Route path="/packages/mock-package-1/examples" component={import("./pages/packages/mock-package-1/examples.js")} />
      <Route path="/packages/mock-package-1" component={import("./pages/packages/mock-package-1.js")} />
      <Route path="/packages/mock-package-2/changelog" component={import("./pages/packages/mock-package-2/changelog.js")} />
      <Route path="/packages/mock-package-2/docs/extended-info" component={import("./pages/packages/mock-package-2/docs/extended-info.js")} />
      <Route path="/packages/mock-package-2/docs/special-usecase" component={import("./pages/packages/mock-package-2/docs/special-usecase.js")} />
      <Route path="/packages/mock-package-2/docs" component={import("./pages/packages/mock-package-2/docs.js")} />
      <Route path="/packages/mock-package-2/examples/example1" component={import("./pages/packages/mock-package-2/examples/example1.js")} />
      <Route path="/packages/mock-package-2/examples/example2" component={import("./pages/packages/mock-package-2/examples/example2.js")} />
      <Route path="/packages/mock-package-2/examples/example3" component={import("./pages/packages/mock-package-2/examples/example3.js")} />
      <Route path="/packages/mock-package-2/examples/isolated/example1" component={import("./pages/packages/mock-package-2/examples/isolated/example1.js")} />
      <Route path="/packages/mock-package-2/examples/isolated/example2" component={import("./pages/packages/mock-package-2/examples/isolated/example2.js")} />
      <Route path="/packages/mock-package-2/examples/isolated/example3" component={import("./pages/packages/mock-package-2/examples/isolated/example3.js")} />
      <Route path="/packages/mock-package-2/examples" component={import("./pages/packages/mock-package-2/examples.js")} />
      <Route path="/packages/mock-package-2" component={import("./pages/packages/mock-package-2.js")} />
      <Route path="/packages/mock-package-3/changelog" component={import("./pages/packages/mock-package-3/changelog.js")} />
      <Route path="/packages/mock-package-3/docs/extended-info" component={import("./pages/packages/mock-package-3/docs/extended-info.js")} />
      <Route path="/packages/mock-package-3/docs/special-usecase" component={import("./pages/packages/mock-package-3/docs/special-usecase.js")} />
      <Route path="/packages/mock-package-3/docs" component={import("./pages/packages/mock-package-3/docs.js")} />
      <Route path="/packages/mock-package-3/examples/example1" component={import("./pages/packages/mock-package-3/examples/example1.js")} />
      <Route path="/packages/mock-package-3/examples/example2" component={import("./pages/packages/mock-package-3/examples/example2.js")} />
      <Route path="/packages/mock-package-3/examples/example3" component={import("./pages/packages/mock-package-3/examples/example3.js")} />
      <Route path="/packages/mock-package-3/examples/isolated/example1" component={import("./pages/packages/mock-package-3/examples/isolated/example1.js")} />
      <Route path="/packages/mock-package-3/examples/isolated/example2" component={import("./pages/packages/mock-package-3/examples/isolated/example2.js")} />
      <Route path="/packages/mock-package-3/examples/isolated/example3" component={import("./pages/packages/mock-package-3/examples/isolated/example3.js")} />
      <Route path="/packages/mock-package-3/examples" component={import("./pages/packages/mock-package-3/examples.js")} />
      <Route path="/packages/mock-package-3" component={import("./pages/packages/mock-package-3.js")} />
      <Route path="/packages/package-with-changelog/changelog" component={import("./pages/packages/package-with-changelog/changelog.js")} />
      <Route path="/packages/package-with-changelog/docs" component={import("./pages/packages/package-with-changelog/docs.js")} />
      <Route path="/packages/package-with-changelog/examples" component={import("./pages/packages/package-with-changelog/examples.js")} />
      <Route path="/packages/package-with-changelog" component={import("./pages/packages/package-with-changelog.js")} />
      <Route path="/packages" component={import("./pages/packages.tsx")} />
      <Route path="/readme" component={import("./pages/readme.js")} />
            <Redirect to='/'/>
        </Switch>
    </Router>
);