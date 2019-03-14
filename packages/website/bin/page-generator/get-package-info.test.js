import path from 'path';
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import getPackageInfo from './get-package-info';

describe('Get package info utility', () => {
  let cwd;
  let packageInfo;
  let externalSources;

  beforeAll(async () => {
    cwd = await copyFixtureIntoTempDir(__dirname, 'simple-mock-packages');
    ({ packages: packageInfo, externalSources } = getPackageInfo([
      path.join(cwd, 'packages', '/*'),
    ]));
  });

  it('returns a list of packages', async () => {
    expect(packageInfo[0]).toHaveProperty('id', 'mock-package1');
    expect(packageInfo[1]).toHaveProperty('id', 'mock-package2');
    expect(packageInfo[2]).toHaveProperty('id', 'mock-package3');
  });

  it('extracts name from package.json', async () => {
    expect(packageInfo[0]).toHaveProperty('name', 'mock-package-1');
    expect(packageInfo[1]).toHaveProperty('name', 'mock-package-2');
    expect(packageInfo[2]).toHaveProperty('name', 'mock-package-3');
  });

  it('finds the path to the package dir', async () => {
    expect(packageInfo[0]).toHaveProperty(
      'pkgPath',
      path.join(cwd, 'packages', 'mock-package1'),
    );
    expect(packageInfo[1]).toHaveProperty(
      'pkgPath',
      path.join(cwd, 'packages', 'mock-package2'),
    );
    expect(packageInfo[2]).toHaveProperty(
      'pkgPath',
      path.join(cwd, 'packages', 'mock-package3'),
    );
  });

  it('finds the path to the package README dir', async () => {
    expect(packageInfo[0]).toHaveProperty(
      'readmePath',
      path.join(cwd, 'packages', 'mock-package1', 'README.md'),
    );
    expect(packageInfo[1]).toHaveProperty(
      'readmePath',
      path.join(cwd, 'packages', 'mock-package2', 'README.md'),
    );
    expect(packageInfo[2]).toHaveProperty(
      'readmePath',
      path.join(cwd, 'packages', 'mock-package3', 'README.md'),
    );
  });

  it('finds the paths of all the docs', async () => {
    const assertDocs = (pkgInfo, pkgName) => {
      expect(pkgInfo).toHaveProperty('docsPaths', [
        {
          id: 'extended-info',
          path: path.join(cwd, 'packages', pkgName, 'docs', 'extended-info.md'),
        },
        {
          id: 'special-usecase',
          path: path.join(
            cwd,
            'packages',
            pkgName,
            'docs',
            'special-usecase.mdx',
          ),
        },
      ]);
    };

    assertDocs(packageInfo[0], 'mock-package1');
    assertDocs(packageInfo[1], 'mock-package2');
    assertDocs(packageInfo[2], 'mock-package3');
  });

  it('finds the paths of all the examples', async () => {
    const assertExamples = (pkgInfo, pkgName) => {
      expect(pkgInfo.examplesPaths).toEqual([
        {
          id: 'example1',
          path: path.join(cwd, 'packages', pkgName, 'examples', 'example1.js'),
        },
        {
          id: 'example2',
          path: path.join(cwd, 'packages', pkgName, 'examples', 'example2.js'),
        },
        {
          id: 'example3',
          path: path.join(cwd, 'packages', pkgName, 'examples', 'example3.js'),
        },
      ]);
    };

    assertExamples(packageInfo[0], 'mock-package1');
    assertExamples(packageInfo[1], 'mock-package2');
    assertExamples(packageInfo[2], 'mock-package3');
  });

  it('can accept an array of paths', () => {
    const { packages: packageInfoAlternate } = getPackageInfo([
      path.join(cwd, 'packages', 'mock-package1'),
      path.join(cwd, 'packages', 'mock-package2'),
      path.join(cwd, 'packages', 'mock-package3'),
    ]);

    expect(packageInfoAlternate[0].id).toEqual('mock-package1');
    expect(packageInfoAlternate[1].id).toEqual('mock-package2');
    expect(packageInfoAlternate[2].id).toEqual('mock-package3');
  });

  it('reads manifest.json instead of package.json when use manifest option is enabled', async () => {
    const manifestAppFixturePath = await copyFixtureIntoTempDir(
      __dirname,
      'mock-packages-manifests',
    );

    const { packages: packageInfoAlternate } = getPackageInfo(
      [path.join(manifestAppFixturePath, 'packages', '*')],
      { useManifests: true },
    );

    expect(packageInfoAlternate[0].id).toEqual('manifest-app-1');
    expect(packageInfoAlternate[0].maintainers).toEqual([
      'cdebourgh',
      'wcollins',
    ]);
  });

  it('returns a list of external sources that need to be bundled', () => {
    const packagesPath = path.join(cwd, 'packages');
    const mp1ExamplePath = path.join(packagesPath, 'mock-package1', 'examples');
    const mp2ExamplePath = path.join(packagesPath, 'mock-package2', 'examples');
    const mp3ExamplePath = path.join(packagesPath, 'mock-package3', 'examples');

    expect(externalSources).toEqual([
      path.join(mp1ExamplePath, 'example1.js'),
      path.join(mp1ExamplePath, 'example2.js'),
      path.join(mp1ExamplePath, 'example3.js'),

      path.join(mp2ExamplePath, 'example1.js'),
      path.join(mp2ExamplePath, 'example2.js'),
      path.join(mp2ExamplePath, 'example3.js'),

      path.join(mp3ExamplePath, 'example1.js'),
      path.join(mp3ExamplePath, 'example2.js'),
      path.join(mp3ExamplePath, 'example3.js'),
    ]);
  });
});
