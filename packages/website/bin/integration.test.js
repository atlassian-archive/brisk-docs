import { spawnSync } from 'child_process';
import path from 'path';

import generatePages from './generate-pages';
import { processConfig } from './handle-config';

import customWebpackConfig from '../__fixtures__/custom-webpack-project/docs.config';
import typescriptConfig from '../__fixtures__/typescript-project/docs.config';
import customBabelConfig from '../__fixtures__/custom-babel-project/docs.config';

const buildWebsiteFromFixture = async config => {
  const fixtureConfig = processConfig(process.cwd(), config);

  await generatePages(fixtureConfig);

  const nextRoot = path.resolve(__dirname, '..');

  const { status, stderr } = spawnSync(
    `PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src next build`,
    [],
    {
      shell: true,
      env: { ...process.env, FORCE_EXTRACT_REACT_TYPES: true },
      cwd: nextRoot,
    },
  );

  if (status !== 0) {
    throw new Error(stderr.toString());
  }
};

describe('Website generation integration tests', () => {
  it('can build a project with a custom Webpack configuration', () => {
    // assert that the website builds without error
    return buildWebsiteFromFixture(customWebpackConfig());
  });

  it('can build a project that uses TypeScript', () => {
    // assert that the website builds without error
    return buildWebsiteFromFixture(typescriptConfig());
  });

  it('can build a project that uses a special Babel config', () => {
    // assert that the website builds without error
    return buildWebsiteFromFixture(customBabelConfig());
  });
});
