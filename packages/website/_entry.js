import React from 'react';
import ReactDOM from 'react-dom';
import Meta, { metadata } from './src/components/meta-context';

import App from './_app';

const Client = () => (
  <Meta.Provider value={metadata}>
    <>
      {' '}
      <App />{' '}
    </>
  </Meta.Provider>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<Client />, document.getElementById('app'));