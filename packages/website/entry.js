import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/index';

export default () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/packages/changeset-bot' component={() => require('./pages/packages/changeset-bot').default()}/>
<Route path='/packages/changeset-bot/changelog' component={() => require('./pages/packages/changeset-bot/changelog').default()}/>
<Route path='/packages/changeset-bot/docs' component={() => require('./pages/packages/changeset-bot/docs').default()}/>
<Route path='/packages/changeset-bot/examples' component={() => require('./pages/packages/changeset-bot/examples').default()}/>
<Route path='/packages/@brisk-docs/file-viewer' component={() => require('./pages/packages/@brisk-docs/file-viewer').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/changelog' component={() => require('./pages/packages/@brisk-docs/file-viewer/changelog').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/docs' component={() => require('./pages/packages/@brisk-docs/file-viewer/docs').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/examples' component={() => require('./pages/packages/@brisk-docs/file-viewer/examples').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/examples/view-button' component={() => require('./pages/packages/@brisk-docs/file-viewer/examples/view-button').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/examples/view-checkbox' component={() => require('./pages/packages/@brisk-docs/file-viewer/examples/view-checkbox').default()}/>
<Route path='/packages/@brisk-docs/file-viewer/examples/view-toggle' component={() => require('./pages/packages/@brisk-docs/file-viewer/examples/view-toggle').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs' component={() => require('./pages/packages/@brisk-docs/react-changelogs').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/changelog' component={() => require('./pages/packages/@brisk-docs/react-changelogs/changelog').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/docs' component={() => require('./pages/packages/@brisk-docs/react-changelogs/docs').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/examples' component={() => require('./pages/packages/@brisk-docs/react-changelogs/examples').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/examples/display-changelog' component={() => require('./pages/packages/@brisk-docs/react-changelogs/examples/display-changelog').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/examples/filter-changelogs' component={() => require('./pages/packages/@brisk-docs/react-changelogs/examples/filter-changelogs').default()}/>
<Route path='/packages/@brisk-docs/react-changelogs/examples/set-changelog-entries-per-page' component={() => require('./pages/packages/@brisk-docs/react-changelogs/examples/set-changelog-entries-per-page').default()}/>
<Route path='/packages/@brisk-docs/website' component={() => require('./pages/packages/@brisk-docs/website').default()}/>
<Route path='/packages/@brisk-docs/website/changelog' component={() => require('./pages/packages/@brisk-docs/website/changelog').default()}/>
<Route path='/packages/@brisk-docs/website/docs' component={() => require('./pages/packages/@brisk-docs/website/docs').default()}/>
<Route path='/packages/@brisk-docs/website/examples' component={() => require('./pages/packages/@brisk-docs/website/examples').default()}/>
<Route path='/packages/@brisk-docs/website/docs/build-pipeline/README' component={() => require('./pages/packages/@brisk-docs/website/docs/build-pipeline/README').default()}/>
<Route path='/packages/@brisk-docs/website/docs/configuration' component={() => require('./pages/packages/@brisk-docs/website/docs/configuration').default()}/>
<Route path='/packages/@brisk-docs/website/docs/configuring-webpack' component={() => require('./pages/packages/@brisk-docs/website/docs/configuring-webpack').default()}/>
<Route path='/packages/@brisk-docs/website/docs/debugging' component={() => require('./pages/packages/@brisk-docs/website/docs/debugging').default()}/>
<Route path='/packages/@brisk-docs/website/docs/writing-package-docs' component={() => require('./pages/packages/@brisk-docs/website/docs/writing-package-docs').default()}/>
<Route path='/packages/@brisk-docs/website/examples/markdown-code-blocks' component={() => require('./pages/packages/@brisk-docs/website/examples/markdown-code-blocks').default()}/>
<Route path='/docs/contributing' component={() => require('./pages/docs/contributing').default()}/>
<Route path='/docs/getting-started' component={() => require('./pages/docs/getting-started').default()}/>
<Route path='/docs/release-process' component={() => require('./pages/docs/release-process').default()}/>
<Route path='/example-pages/guide-1' component={() => require('./pages/example-pages/guide-1').default()}/>
<Route path='/example-pages/something' component={() => require('./pages/example-pages/something').default()}/>
<Route path='/example-pages/something-else' component={() => require('./pages/example-pages/something-else').default()}/>
<Route path='/example-pages/sub-guides' component={() => require('./pages/example-pages/sub-guides').default()}/>
<Route path='/packages' component={() => require('./pages/packages').default()}/>
<Route path='/docs' component={() => require('./pages/docs').default()}/>
<Route path='/example-pages' component={() => require('./pages/example-pages').default()}/>
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  </>
);