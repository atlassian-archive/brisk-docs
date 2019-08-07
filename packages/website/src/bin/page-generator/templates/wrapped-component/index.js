const outdent = require('outdent');
const getRoutePath = require('../getRoute');

/**
 * wrappedComponentTemplate - template for a page containing one
 * component wrapped is another, usually user content being wrapped
 * inside a page template component
 *
 * @param {string} componentPath absolute path to the inner component
 * @param {string} wrapperPath   absolute path to the wrapper component
 * @param {object} [data={}]     extra data needed by the page
 *
 * @returns {type} source code for the page
 */
const wrappedComponentTemplate = (
  componentPath,
  wrapperPath,
  data = {},
) => outdent`
  import React from 'react';
  import { Route } from 'react-router-dom';
  import Component from '${componentPath}';
  import Wrapper from '${wrapperPath}';

  const view = () => (
    <Wrapper data={${JSON.stringify(data)}}>
        <Component />
    </Wrapper>
  );
  
  export default () => <Route path='/${getRoutePath(
    data.pagePath,
  )}' component={view}/>
`;

module.exports = wrappedComponentTemplate;
