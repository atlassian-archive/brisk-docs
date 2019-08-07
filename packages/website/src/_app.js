/* eslint-env browser */
/* global parcelRequire, __BRISK_ENTRY_ASSET_ID */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Meta, { metadata } from './components/meta-context';

const pageEntryModule = parcelRequire(__BRISK_ENTRY_ASSET_ID);
const PageEntryComponent =
  typeof pageEntryModule.default !== 'undefined'
    ? pageEntryModule.default
    : pageEntryModule;

console.log(PageEntryComponent);

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <Meta.Provider value={metadata}>
        <BrowserRouter>
          <Switch>
            <PageEntryComponent />
          </Switch>
        </BrowserRouter>
      </Meta.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
