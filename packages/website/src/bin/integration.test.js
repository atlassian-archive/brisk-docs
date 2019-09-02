import path from 'path';

import { build } from './run-website';

import { fixturesPath } from '../../__fixtures__';

const customWebpackConfig = path.join(
  fixturesPath,
  'custom-webpack-project/docs.config',
);
const typescriptConfig = path.join(
  fixturesPath,
  'typescript-project/docs.config',
);
const customBabelConfig = path.join(
  fixturesPath,
  'custom-babel-project/docs.config',
);

describe.skip('Website generation integration tests', () => {
  it('can build a project with a custom Webpack configuration', () => {
    // assert that the website builds without error
    return build(customWebpackConfig);
  });

  it('can build a project that uses TypeScript', () => {
    // assert that the website builds without error
    return build(typescriptConfig);
  });

  it('can build a project that uses a special Babel config', () => {
    // assert that the website builds without error
    return build(customBabelConfig);
  });
});
