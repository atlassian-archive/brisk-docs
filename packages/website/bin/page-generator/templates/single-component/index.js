const outdent = require('outdent');

const basicSingleComponentTemplate = (wrapperPath, data = {}) => outdent`
    import React from 'react';
    import Wrapper from '${wrapperPath}';

    export default () => (
      <Wrapper data={${JSON.stringify(data)}} />
    );
`;

module.exports = basicSingleComponentTemplate;
