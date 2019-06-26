import { getFixturePath } from 'jest-fixtures';
import { processConfig, loadConfig } from './handle-config';

const mockCwd = '/c/w/d';

describe('website configuration processor', () => {
  it('returns default values when no config values are passed', () => {
    const config = processConfig(mockCwd, {});

    expect(config).toEqual({
      packagesPaths: ['/c/w/d/packages/**/*'],
      docsList: [
        {
          description: 'View the documentation for this project',
          docsPath: '/c/w/d/docs',
          name: 'Docs',
          urlPath: 'docs',
        },
      ],
      useManifests: false,
      siteName: 'Brisk Docs',
      webpack: expect.any(Function),
      readMePath: '/c/w/d/README.md',
      showSubExamples: false,
      packagesDescription: 'View documentation about individual packages',
      customPackageFields: ['license', 'maintainers', 'name', 'version'],
    });
  });

  it('accepts a docs path as a string', () => {
    const { docsList } = processConfig(mockCwd, {
      docs: {
        path: 'some/other/docs',
        name: 'Docs',
        description: 'View the documentation for this project',
      },
    });
    expect(docsList[0].docsPath).toEqual('/c/w/d/some/other/docs');
  });

  it('accepts an packages path as a string', () => {
    const config = processConfig(mockCwd, { packages: 'some/other/packages' });

    expect(config.packagesPaths).toEqual(['/c/w/d/some/other/packages']);
  });

  it('accepts packages paths as an array of strings', () => {
    const config = processConfig(mockCwd, {
      packages: ['some/other/packages', 'some/better/packages'],
    });

    expect(config.packagesPaths).toEqual([
      '/c/w/d/some/other/packages',
      '/c/w/d/some/better/packages',
    ]);
  });

  it('passes through flags', () => {
    const config = processConfig(mockCwd, { useManifests: true });

    expect(config.useManifests).toEqual(true);
  });

  it('accepts a webpack function', () => {
    const dummyWebpack = _ => _;

    const config = processConfig(mockCwd, { webpack: dummyWebpack });
    expect(config.webpack).toBe(dummyWebpack);
  });

  it('accepts a custom docs urlPath argument', () => {
    const { docsList } = processConfig(mockCwd, {
      docs: {
        path: 'some/other/docs',
        name: 'Docs',
        description: 'View the documentation for this project',
        urlPath: 'custom-docs',
      },
    });
    expect(docsList[0].urlPath).toEqual('custom-docs');
  });

  it('sets urlPath to the docs path by default', () => {
    const { docsList } = processConfig(mockCwd, {
      docs: {
        path: 'some/other/docs',
        name: 'Docs',
        description: 'View the documentation for this project',
      },
    });
    expect(docsList[0].urlPath).toEqual('some/other/docs');
  });
});

describe('loadConfig', () => {
  let defaultConfigPath;

  beforeAll(async () => {
    defaultConfigPath = await getFixturePath(__dirname, 'default-config');
  });

  it('should load a config given a valid config path', () => {
    expect(loadConfig(defaultConfigPath, 'custom-config-file.js')).toEqual({
      docs: {
        path: 'now/is/the/winter',
        description: 'View custom documentation',
      },
      packages: ['of/our/disco/tents'],
      packagesDescription:
        'View custom documentation about individual packages',
    });
  });
  it('should load the default config if no path is given', () => {
    expect(loadConfig(defaultConfigPath)).toEqual({
      docs: { path: 'a/b/c', name: 'docs' },
      packages: ['x/y/z'],
    });
  });
  it('should load all the items in the docs as array in a config', () => {
    expect(loadConfig(defaultConfigPath, 'docs-with-array-config.js')).toEqual({
      docs: [
        {
          path: 'now/is/the/winter',
          name: 'docs',
          description: 'View custom documentation',
        },
        {
          path: 'now/is/the/summer',
          name: 'guides',
          description: 'View custom guides',
        },
      ],
      packages: ['of/our/disco/tents'],
      packagesDescription:
        'View custom documentation about individual packages',
    });
  });
});
