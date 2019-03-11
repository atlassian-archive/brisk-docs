import processConfig from './index';

const mockCwd = '/c/w/d';

describe('website configuration processor', () => {
  it('returns default values when no config values are passed', () => {
    const config = processConfig(mockCwd, {});

    expect(config).toEqual({
      packagesPaths: ['/c/w/d/packages'],
      docsPath: '/c/w/d/docs',
      useManifests: false,
    });
  });

  it('accepts a docs path as a string', () => {
    const config = processConfig(mockCwd, { docs: 'some/other/docs' });

    expect(config.docsPath).toEqual('/c/w/d/some/other/docs');
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
});
