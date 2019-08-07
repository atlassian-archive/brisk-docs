const outdent = require('outdent');
const getRoutePath = require('../getRoute');

/**
 * basicSingleComponentTemplate - Template for a page that renders a single component
 *
 * @param {string} wrapperPath absolute path to the component being rendered
 * @param {object} [data={}]   extra data needed for the page
 *
 * @returns {string} source code for the page
 */
const basicSingleComponentTemplate = (wrapperPath, data = {}) => outdent`
    import React from 'react';
    import Wrapper from '${wrapperPath}';

    const view = () => (
      <Wrapper data={${JSON.stringify(data)}} />
    );
    export default () => <Route path='/${getRoutePath(
      data.pagePath || data.isolatedPath,
    )}' component={view}/>
`;

module.exports = basicSingleComponentTemplate;
