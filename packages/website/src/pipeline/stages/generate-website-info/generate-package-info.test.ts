import generatePackageInfo, { PackageGroup } from './generate-package-info';

const mockData: PackageGroup[] = [
  {
    groupId: 'group-1',
    packages: [
      {
        id: 'package-1',
        name: 'Package One',
        customPackageFields: {
          customField1: 'foo',
          customField2: 'bar',
        },
        readmePath: '/content/packages/package-1/README.md',
        readmeMeta: {
          metaField1: 'baz',
        },
        packageTitle: 'Package 1 title',
        changelogPath: '/content/packages/package-1/CHANGELOG.md',
      },
    ],
  },
  {
    groupId: 'group-2',
    packages: [
      {
        id: 'package-2',
        name: 'Package Two',
        customPackageFields: {},
        readmePath: '/content/packages/package-2/README.md',
        readmeMeta: {},
      },
      {
        id: 'package-3',
        name: 'Package Three',
        customPackageFields: {},
        readmePath: '/content/packages/package-3/README.md',
        readmeMeta: {},
      },
    ],
  },
];

describe('Package website info generator', () => {
  it('processes the packages from groups and sets the parent field on the sitemap entries', () => {
    const { sitemap } = generatePackageInfo(mockData);

    expect(sitemap).toHaveLength(3);

    expect(sitemap[0]).toMatchObject({
      packageId: 'package-1',
      parentId: 'group-1',
    });
    expect(sitemap[1]).toMatchObject({
      packageId: 'package-2',
      parentId: 'group-2',
    });
    expect(sitemap[2]).toMatchObject({
      packageId: 'package-3',
      parentId: 'group-2',
    });
  });

  it('outputs package metadata using custom package fields', () => {
    const { meta } = generatePackageInfo(mockData);

    expect(meta).toHaveLength(3);

    expect(meta[0]).toEqual({
      id: 'package-1',
      customPackageFields: ['customField1', 'customField2'],
      customField1: 'foo',
      customField2: 'bar',
    });
  });

  it('adds extra display info into the sitemap', () => {
    const { sitemap } = generatePackageInfo(mockData);

    expect(sitemap[0]).toMatchObject({
      packageTitle: 'Package 1 title',
      homeMeta: {
        metaField1: 'baz',
      },
    });
  });

  it('outputs a home page for packages and adds its path in the sitemap', () => {
    const { sitemap, pages } = generatePackageInfo(mockData);

    expect(sitemap[0].homePath).toEqual('/packages/package-1');

    expect(pages.packageHomePages).toHaveLength(3);
    expect(pages.packageHomePages).toContainEqual({
      websitePath: 'packages/package-1',
      markdownPath: '/content/packages/package-1/README.md',
      pageData: {
        id: 'package-1',
        packageName: 'Package One',
        customPackageFields: ['customField1', 'customField2'],
        customField1: 'foo',
        customField2: 'bar',
      },
      meta: { title: 'Package 1' },
    });
  });

  it('outputs a changelog page for packages and adds its path in the sitemap', () => {
    const { sitemap, pages } = generatePackageInfo(mockData);

    expect(sitemap[0].changelogPath).toEqual('/packages/package-1/changelog');

    expect(pages.changelogPages).toHaveLength(1);
    expect(pages.changelogPages[0]).toEqual({
      websitePath: 'packages/package-1/changelog',
      changelogPath: '/content/packages/package-1/CHANGELOG.md',
      pageData: {
        id: 'package-1',
        packageName: 'Package One',
      },
      title: 'Changelog',
    });
  });

  it('outputs a docs home page for packages and adds its path in the sitemap', () => {
    const { sitemap, pages } = generatePackageInfo(mockData);

    expect(sitemap[0].docPath).toEqual('/packages/package-1/docs');

    expect(pages.docsHomePages).toHaveLength(3);
    expect(pages.docsHomePages[0]).toEqual({
      websitePath: 'packages/package-1/docs',
      pageData: {
        id: 'package-1',
        packageName: 'Package One',
      },
      title: 'Documents',
    });
  });

  it('outputs a examples home page for packages and adds its path in the sitemap', () => {
    const { sitemap, pages } = generatePackageInfo(mockData);

    expect(sitemap[0].examplePath).toEqual('/packages/package-1/examples');

    expect(pages.examplesHomePages).toHaveLength(3);
    expect(pages.examplesHomePages[0]).toEqual({
      websitePath: 'packages/package-1/examples',
      pageData: {
        id: 'package-1',
        packageName: 'Package One',
      },
      title: 'Examples',
    });
  });
});
