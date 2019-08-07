const outdent = require('outdent');
const getRoutePath = require('../getRoute');

/**
 * changelogTemplate - template for generating a changelog page
 *
 * @param {string} changelogPath relative path to the changelog file
 * @param {string} wrapperPath   relative path to the page template component
 * @param {object} [data={}]     extra data needed by the page
 *
 * @returns {string} source code for the page
 */
const changelogTemplate = (changelogPath, wrapperPath, data = {}) => outdent`
  import React from 'react';
  import changelog from '!!raw-loader!${changelogPath}';
  import Wrapper from '${wrapperPath}';

  const view = () => (
    <Wrapper data={${JSON.stringify(data)}}>
        {changelog}
    </Wrapper>
  );
  export default () => <Route path='/${getRoutePath(
    data.pagePath,
  )}' component={view}/>
`;

module.exports = changelogTemplate;
