const assertImportsReact = source => {
  expect(source).toMatch(/^import React from 'react';$/m);
};

export const assertHasDefaultExport = source => {
  expect(source).toMatch(
    /\[{\s*name: 'default',\s*component: <Components.default \/>\s*}/,
  );
};

const assertValidTemplate = source => {
  assertImportsReact(source);
};

export default assertValidTemplate;
