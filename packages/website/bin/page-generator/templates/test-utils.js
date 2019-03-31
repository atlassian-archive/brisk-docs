const assertImportsReact = source => {
  expect(source).toMatch(/^import React from 'react';$/m);
};

const assertNoAbsoluteImports = source => {
  expect(source).not.toMatch(/^import .+ from '\/.+'/m);
};

export const assertValidTemplate = source => {
  assertImportsReact(source);
  assertNoAbsoluteImports(source);
};
