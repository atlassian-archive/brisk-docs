const outdent = require('outdent');

/**
 * exampleTemplate - template for an example page where the source code
 * for the wrapped component is also passed to the wrapper
 *
 * @param {string} componentPath absolute path to the example
 * @param {string} wrapperPath   absolute path to the page wrapper
 * @param {object} [data={}]     extra data needed for the page
 *
 * @returns {string} source code for the page
 */
const exampleTemplate = (componentPath, wrapperPath, data = {}) => outdent`
    import React from 'react';
    import dynamic from 'next/dynamic';
    import fileContents from '!!raw-loader!${componentPath}';

    import Wrapper from '${wrapperPath}';
    
    const Component = dynamic(import('${componentPath}'));
    export default () => (
      <Wrapper data={${JSON.stringify(data)}} fileContents={fileContents}>
          <Component />
      </Wrapper>
    );
`;

module.exports = exampleTemplate;
