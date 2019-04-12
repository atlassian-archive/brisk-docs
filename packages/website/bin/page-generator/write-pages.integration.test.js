import { createTempDir } from 'jest-fixtures';
import path from 'path';
import fse from 'fs-extra';

import * as generators from './write-pages';

const assertNoAbsoluteImports = source => {
  expect(source).not.toMatch(/^import .+ from '\/.+'/m);
};

describe('Page templates', () => {
  let cwd;
  let pagesPath;
  let wrappersPath;

  const getOutput = filename => {
    const outputPath = path.join(pagesPath, filename);
    return fse.readFileSync(outputPath, { encoding: 'utf-8' });
  };

  beforeEach(async () => {
    cwd = await createTempDir();
    pagesPath = path.join(cwd, 'pages');
    wrappersPath = path.join(cwd, 'wrappers');
  });

  it('creates js for a package home page', () => {
    generators.generateHomePage(
      'output.js',
      path.join(cwd, 'README.md'),
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    assertNoAbsoluteImports(output);
  });

  it('creates js for a package home page when there is no README file', () => {
    generators.generateHomePage(
      'output.js',
      '',
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');
    expect(output).not.toMatch(/^import .+ from '\undefined'/m);
  });

  it('creates js for a package doc page', () => {
    generators.generatePackageDocPage(
      'output.js',
      path.join(cwd, 'README.md'),
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    assertNoAbsoluteImports(output);
  });

  it('creates js for a package example pages', () => {
    generators.generateExamplePage(
      'output.js',
      'output-raw.js',
      path.join(cwd, 'example.js'),
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    const outputRaw = getOutput('output-raw.js');

    assertNoAbsoluteImports(output);

    assertNoAbsoluteImports(outputRaw);
  });

  it('creates js for a docs home page', () => {
    generators.generateDocsHomePage(
      'output.js',
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    assertNoAbsoluteImports(output);
  });

  it('creates js for an examples home page', () => {
    generators.generateExamplesHomePage(
      'output.js',
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    assertNoAbsoluteImports(output);
  });

  it('creates js for project doc page', () => {
    generators.generateProjectDocPage(
      'output.js',
      path.join(cwd, 'README.md'),
      {},
      { wrappersPath, pagesPath },
    );

    const output = getOutput('output.js');

    assertNoAbsoluteImports(output);
  });
});
