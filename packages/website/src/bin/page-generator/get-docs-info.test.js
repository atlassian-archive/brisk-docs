import path from 'path';
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import getDocsInfo from './get-docs-info';

describe('Get docs info utility', () => {
  let cwd;
  let docsInfo;

  beforeAll(async () => {
    cwd = await copyFixtureIntoTempDir(__dirname, 'simple-mock-docs');
    docsInfo = getDocsInfo(path.join(cwd, 'docs'));
  });

  it('returns an array of all the pages in the docs folder', () => {
    expect(docsInfo[0]).toEqual({
      id: 'doc-1',
      path: path.join(cwd, 'docs', 'doc-1.md'),
    });
    expect(docsInfo[1]).toEqual({
      id: 'doc-2',
      path: path.join(cwd, 'docs', 'doc-2.md'),
    });
  });

  it('reads nested files within the docs', () => {
    expect(docsInfo[2]).toEqual({
      id: 'doc-3',
      children: [
        {
          id: 'doc-3-1',
          path: path.join(cwd, 'docs', 'doc-3', 'doc-3-1.md'),
        },
        {
          id: 'doc-3-2',
          children: [
            {
              id: 'doc-3-2-1',
              path: path.join(cwd, 'docs', 'doc-3', 'doc-3-2', 'doc-3-2-1.md'),
            },
          ],
        },
      ],
    });
  });

  it('reads only .md and .mdx files', () => {
    expect(docsInfo).not.toContainEqual(
      expect.objectContaining({ id: 'derpo' }),
    );
  });
});

describe('Missing docs directory', () => {
  let cwd;
  let docsInfo;

  beforeAll(async () => {
    cwd = await copyFixtureIntoTempDir(__dirname, 'simple-mock-packages');
    docsInfo = getDocsInfo(path.join(cwd, 'docs'));
  });

  it('should return null if the docs folder does not exist', () => {
    expect(docsInfo).toBeNull();
  });
});

describe('docs-with-readmes', () => {
  let cwd;
  let docsInfo;

  beforeAll(async () => {
    cwd = await copyFixtureIntoTempDir(__dirname, 'docs-with-readme');
    docsInfo = getDocsInfo(path.join(cwd, 'docs'));
  });

  it('should replace the base index page with the readme page', () => {
    expect(docsInfo[2]).toEqual({
      id: 'doc-3',
      children: [
        {
          id: 'doc-3-2',
          children: [
            {
              id: 'README',
              path: path.join(cwd, 'docs', 'doc-3', 'doc-3-2', 'README.md'),
            },
          ],
        },
        {
          id: 'readme',
          path: path.join(cwd, 'docs', 'doc-3', 'readme.md'),
        },
      ],
    });
  });
});

describe('Test exclude everything that are non md files', () => {
  let cwd;
  let docsInfo;

  beforeAll(async () => {
    cwd = await copyFixtureIntoTempDir(__dirname, 'mock-docs-with-assets');
    docsInfo = getDocsInfo(path.join(cwd, 'docs'));
  });

  it('returns an array of all the pages in the docs folder excluding non md files', () => {
    expect(docsInfo[0]).toEqual({
      id: 'doc-2',
      path: path.join(cwd, 'docs', 'doc-2.md'),
    });
    expect(docsInfo[1]).toEqual({
      id: 'sub-docs',
      children: [
        {
          id: 'doc-1',
          path: path.join(cwd, 'docs', 'sub-docs', 'doc-1.md'),
        },
      ],
    });
  });
});
