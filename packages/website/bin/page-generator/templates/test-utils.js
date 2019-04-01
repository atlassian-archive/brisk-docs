const assertImportsReact = source => {
  expect(source).toMatch(/^import React from 'react';$/m);
};

const assertNoAbsoluteImports = source => {
  // FIXME: this is useless at this level, needs to be moved up to integration
  expect(source).not.toMatch(/^import .+ from '\/.+'/m);
};

export const assertValidTemplate = source => {
  assertImportsReact(source);
  assertNoAbsoluteImports(source);
};
