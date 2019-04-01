const outdent = require('outdent');

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
const wrappedComponentTemplate = (componentPath, wrapperPath, data = {}) => {
  return outdent`
    import React from 'react';
    import Component from '${componentPath}';
    import Wrapper from '${wrapperPath}';

    export default () => (
      <Wrapper data={${JSON.stringify(data)}}>
          <Component />
      </Wrapper>
    );
  `;
};

module.exports = wrappedComponentTemplate;
