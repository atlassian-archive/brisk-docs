const React = require('react');
const AppProvider = require('./pages/_app.tsx').default;
const Layout = require('./pages/_layout.tsx').default;

/* eslint-disable react/prop-types */

exports.wrapRootElement = ({ element }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <AppProvider>{element}</AppProvider>;
};

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>;
};
