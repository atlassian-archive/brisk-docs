const outdent = require('outdent');

/**
 * wrappedComponentTemplate - template for a page containing one
 * component wrapped is another, usually user content being wrapped
 * inside a page template component
 *
 * @param {string}   componentPath Description
 * @param {string}   wrapperPath   Description
 * @param {object} [data={}]     Description
 *
 * @returns {type} Description
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
