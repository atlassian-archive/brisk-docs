import path from 'path';
import fs from 'fs-extra';
import { copyFixtureIntoTempDir, createTempDir } from 'jest-fixtures';

import generatePages from './index';

const defaultPagesPath = path.resolve(__dirname, '../../../default-pages');

async function runGeneratePages({
  docsFixture,
  docsList,
  options,
  packagesFixture,
  packageGlob = '/*',
  packageRoot,
  packageReadme,
} = {}) {
  const packagesCwd = await copyFixtureIntoTempDir(__dirname, packagesFixture);

  const docsCwd = await copyFixtureIntoTempDir(__dirname, docsFixture);

  const packagesPaths = [path.join(packagesCwd, 'packages', packageGlob)];
  const componentsPath = await createTempDir();

  const actualDocsList = docsList
    ? docsList.map(d => ({ ...d, docsPath: path.join(docsCwd, d.docsPath) }))
    : [
        {
          docsPath: path.join(docsCwd, 'docs'),
          name: 'docs',
          urlPath: 'docs',
        },
      ];

  const resolvedPackageRoot = packageRoot || (await createTempDir());

  const tempDefaultPagesPath = path.join(resolvedPackageRoot, 'default-pages');
  await fs.copy(defaultPagesPath, tempDefaultPagesPath);

  const readmePath = packageReadme
    ? path.join(packagesCwd, packageReadme)
    : undefined;

  return generatePages(
    packagesPaths,
    actualDocsList,
    resolvedPackageRoot,
    componentsPath,
    options,
    readmePath,
  );
}

describe('Generate pages', () => {
  let packageRoot;
  let pagesPath;
  let sitemap;

  beforeAll(async () => {
    packageRoot = await createTempDir();
    pagesPath = path.join(packageRoot, 'pages');
    sitemap = await runGeneratePages({
      docsFixture: 'simple-mock-docs',
      packagesFixture: 'simple-mock-packages',
      packageRoot,
    });
  });

  describe('package pages generation', () => {
    it('creates a home page per package', async () => {
      expect(
        fs.existsSync(
          path.join(pagesPath, 'packages', 'mock-package1', 'index.js'),
        ),
      ).toEqual(true);
      expect(
        fs.existsSync(
          path.join(pagesPath, 'packages', 'mock-package2', 'index.js'),
        ),
      ).toEqual(true);
      expect(
        fs.existsSync(
          path.join(pagesPath, 'packages', 'mock-package2', 'index.js'),
        ),
      ).toEqual(true);
    });

    it('creates docs pages for each package', () => {
      const assertDocs = packageId => {
        const packageDocsPath = path.join(
          pagesPath,
          'packages',
          packageId,
          'docs',
        );
        expect(fs.existsSync(path.join(packageDocsPath, 'index.js'))).toEqual(
          true,
        );
        expect(
          fs.existsSync(path.join(packageDocsPath, 'extended-info.js')),
        ).toEqual(true);
        expect(
          fs.existsSync(path.join(packageDocsPath, 'special-usecase.js')),
        ).toEqual(true);
      };

      assertDocs('mock-package1');
      assertDocs('mock-package2');
      assertDocs('mock-package3');
    });

    it('creates examples pages for each package', () => {
      const assertDocs = packageId => {
        const packageExamplesPath = path.join(
          pagesPath,
          'packages',
          packageId,
          'examples',
        );
        expect(
          fs.existsSync(path.join(packageExamplesPath, 'index.js')),
        ).toEqual(true);
        expect(
          fs.existsSync(path.join(packageExamplesPath, 'example1.js')),
        ).toEqual(true);
        expect(
          fs.existsSync(path.join(packageExamplesPath, 'example2.js')),
        ).toEqual(true);
        expect(
          fs.existsSync(path.join(packageExamplesPath, 'example3.js')),
        ).toEqual(true);
      };

      assertDocs('mock-package1');
      assertDocs('mock-package2');
      assertDocs('mock-package3');
    });

    describe('sitemap generation', () => {
      let packagesSitemap;

      beforeAll(() => {
        packagesSitemap = sitemap.packages;
      });

      it('gets the id for each package', () => {
        expect(packagesSitemap[0].packageId).toEqual('mock-package1');
        expect(packagesSitemap[1].packageId).toEqual('mock-package2');
        expect(packagesSitemap[2].packageId).toEqual('mock-package3');
      });

      it('gets the home page path for each package', () => {
        expect(packagesSitemap[0].homePath).toEqual('/packages/mock-package1');
        expect(packagesSitemap[1].homePath).toEqual('/packages/mock-package2');
        expect(packagesSitemap[2].homePath).toEqual('/packages/mock-package3');
      });

      it('gets the docs pages for each package', () => {
        const assertDocs = (docs, packageId) => {
          const packageDocsPath = path.join('/', 'packages', packageId, 'docs');

          const nonsense =
            packageId === 'mock-package1'
              ? [
                  {
                    children: [
                      {
                        id: 'nesting-now-supported',
                        pagePath: path.join(
                          packageDocsPath,
                          'some-subdirectory/nesting-now-supported',
                        ),
                      },
                    ],
                    id: 'some-subdirectory',
                    pagePath: path.join(packageDocsPath, 'some-subdirectory'),
                  },
                ]
              : [];

          expect(docs).toEqual([
            {
              id: 'extended-info',
              pagePath: path.join(packageDocsPath, 'extended-info'),
            },
            ...nonsense,
            {
              id: 'special-usecase',
              pagePath: path.join(packageDocsPath, 'special-usecase'),
            },
          ]);
        };

        assertDocs(packagesSitemap[0].docs, 'mock-package1');
        assertDocs(packagesSitemap[1].docs, 'mock-package2');
        assertDocs(packagesSitemap[2].docs, 'mock-package3');
      });

      it('gets the examples pages for each package', () => {
        const assertDocs = (examples, packageId) => {
          const packageDocsPath = path.join(
            '/',
            'packages',
            packageId,
            'examples',
          );

          expect(examples).toEqual([
            {
              id: 'example1',
              pagePath: path.join(packageDocsPath, 'example1'),
              isolatedPath: path.join(packageDocsPath, 'isolated/example1'),
            },
            {
              id: 'example2',
              pagePath: path.join(packageDocsPath, 'example2'),
              isolatedPath: path.join(packageDocsPath, 'isolated/example2'),
            },
            {
              id: 'example3',
              pagePath: path.join(packageDocsPath, 'example3'),
              isolatedPath: path.join(packageDocsPath, 'isolated/example3'),
            },
          ]);
        };

        assertDocs(packagesSitemap[0].examples, 'mock-package1');
        assertDocs(packagesSitemap[1].examples, 'mock-package2');
        assertDocs(packagesSitemap[2].examples, 'mock-package3');
      });

      it('gets the docs folder path for each package', () => {
        expect(packagesSitemap[0].docPath).toEqual(
          '/packages/mock-package1/docs',
        );
        expect(packagesSitemap[1].docPath).toEqual(
          '/packages/mock-package2/docs',
        );
        expect(packagesSitemap[2].docPath).toEqual(
          '/packages/mock-package3/docs',
        );
      });

      it('gets the examples folder path for each package', () => {
        expect(packagesSitemap[0].examplePath).toEqual(
          '/packages/mock-package1/examples',
        );
        expect(packagesSitemap[1].examplePath).toEqual(
          '/packages/mock-package2/examples',
        );
        expect(packagesSitemap[2].examplePath).toEqual(
          '/packages/mock-package3/examples',
        );
      });
    });
  });

  describe('docs pages generation', () => {
    it('creates pages for each markdown file', () => {
      expect(fs.existsSync(path.join(pagesPath, 'docs', 'doc-1.js'))).toEqual(
        true,
      );
      expect(fs.existsSync(path.join(pagesPath, 'docs', 'doc-2.js'))).toEqual(
        true,
      );
      expect(
        fs.existsSync(path.join(pagesPath, 'docs', 'doc-3', 'doc-3-1.js')),
      ).toEqual(true);
      expect(
        fs.existsSync(
          path.join(pagesPath, 'docs', 'doc-3', 'doc-3-2', 'doc-3-2-1.js'),
        ),
      ).toEqual(true);
    });

    describe('sitemap generation', () => {
      let docsSitemap;

      beforeAll(() => {
        docsSitemap = sitemap.docs;
      });

      it('gets ids for all docs from the filesystem structure', () => {
        expect(docsSitemap[0].id).toEqual('doc-1');
        expect(docsSitemap[1].id).toEqual('doc-2');
        expect(docsSitemap[2].id).toEqual('doc-3');

        // nested docs
        expect(docsSitemap[2].children[0].id).toEqual('doc-3-1');
        expect(docsSitemap[2].children[1].id).toEqual('doc-3-2');
        expect(docsSitemap[2].children[1].children[0].id).toEqual('doc-3-2-1');
      });

      it('gets url paths for all docs pages in the filesystem structure', () => {
        expect(docsSitemap[0].pagePath).toEqual('/docs/doc-1');
        expect(docsSitemap[1].pagePath).toEqual('/docs/doc-2');

        // nested docs
        expect(docsSitemap[2].children[0].pagePath).toEqual(
          '/docs/doc-3/doc-3-1',
        );
        expect(docsSitemap[2].children[1].children[0].pagePath).toEqual(
          '/docs/doc-3/doc-3-2/doc-3-2-1',
        );
      });
    });
  });

  describe('docs pages generation with differing name and path', () => {
    let customPackagePath;
    let customPagesPath;
    let customSitemap;
    beforeAll(async () => {
      customPackagePath = await createTempDir();
      customPagesPath = path.join(customPackagePath, 'pages');
      customSitemap = await runGeneratePages({
        docsFixture: 'mock-docs-with-guides',
        docsList: [
          { docsPath: 'guides', name: 'Cool doc stuff', urlPath: 'guides' },
        ],
        packagesFixture: 'simple-mock-packages',
        packageRoot: customPackagePath,
      });
    });

    it('creates pages for each markdown file based on docsPath rather than name', () => {
      expect(
        fs.existsSync(path.join(customPagesPath, 'guides', 'testguide.js')),
      ).toEqual(true);
      expect(
        fs.existsSync(path.join(customPagesPath, 'docs', 'testdoc.js')),
      ).toEqual(false);
      expect(
        fs.existsSync(path.join(customPagesPath, 'cool-doc-stuff')),
      ).toEqual(false);
    });

    describe('sitemap generation', () => {
      it('generates the docs key based on name', () => {
        expect(customSitemap['cool-doc-stuff']).toBeDefined();
        expect(customSitemap.guides).not.toBeDefined();
      });

      it('generates page paths based on docs path rather than name', () => {
        expect(customSitemap['cool-doc-stuff'][0].pagePath).toEqual(
          '/guides/testguide',
        );
      });
    });
  });

  describe('meta data generation', () => {
    let metaDataInfo;
    beforeAll(() => {
      metaDataInfo = sitemap.metaData;
    });

    it('gets specified metadata values for each of the packages', () => {
      expect(metaDataInfo[0].id).toEqual('mock-package1');
      expect(metaDataInfo[1].id).toEqual('mock-package2');
      expect(metaDataInfo[2].id).toEqual('mock-package3');
    });
  });

  describe('Sub examples page generation test', () => {
    let subExampleSitemap;
    beforeAll(async () => {
      subExampleSitemap = await runGeneratePages({
        docsFixture: 'simple-mock-docs',
        options: { showSubExamples: true },
        packagesFixture: 'mock-package-with-sub-examples',
      });
    });

    it('gets all examples in the package structure other than in examples folder', () => {
      expect(subExampleSitemap.packages[0].subExamples[0].id).toEqual('src');
      expect(
        subExampleSitemap.packages[0].subExamples[0].children[0].id,
      ).toEqual('examples');

      // nested examples
      expect(
        subExampleSitemap.packages[0].subExamples[0].children[1].id,
      ).toEqual('test-examples');
      expect(
        subExampleSitemap.packages[0].subExamples[0].children[1].children[0].id,
      ).toEqual('examples');
      expect(
        subExampleSitemap.packages[0].subExamples[0].children[2].id,
      ).toEqual('view');
      expect(
        subExampleSitemap.packages[0].subExamples[0].children[2].children[1].id,
      ).toEqual('sub-dir');
    });
  });

  it('should include the default pages', () => {
    expect(fs.existsSync(path.join(pagesPath, '_app.tsx'))).toEqual(true);
    expect(fs.existsSync(path.join(pagesPath, '_document.tsx'))).toEqual(true);
    expect(fs.existsSync(path.join(pagesPath, '_error.tsx'))).toEqual(true);
    expect(fs.existsSync(path.join(pagesPath, 'index.tsx'))).toEqual(true);
    expect(fs.existsSync(path.join(pagesPath, 'packages.tsx'))).toEqual(true);
  });
});

describe('File modification tests', () => {
  let packagesPath;
  let docsPath;
  let pagesPath;
  let packageRoot;
  let componentsPath;

  beforeEach(async () => {
    const packagesCwd = await copyFixtureIntoTempDir(
      __dirname,
      'simple-mock-packages',
    );
    const docsCwd = await copyFixtureIntoTempDir(__dirname, 'simple-mock-docs');

    packagesPath = path.join(packagesCwd, 'packages');
    docsPath = path.join(docsCwd, 'docs');
    packageRoot = await createTempDir();
    pagesPath = path.join(packageRoot, 'pages');
    componentsPath = await createTempDir();

    const tempDefaultPagesPath = path.join(packageRoot, 'default-pages');
    await fs.copy(defaultPagesPath, tempDefaultPagesPath);
  });

  it('should remove files from package docs pages that are removed from disc on rerun', async () => {
    const firstDocsPage = path.join(
      pagesPath,
      'packages',
      'mock-package1',
      'docs',
      'extended-info.js',
    );
    await generatePages(
      [path.join(packagesPath, '/*')],
      [{ docsPath, name: 'docs', urlPath: 'docs' }],
      packageRoot,
      componentsPath,
    );

    expect(fs.existsSync(firstDocsPage)).toEqual(true);

    fs.unlinkSync(
      path.join(packagesPath, 'mock-package1', 'docs', 'extended-info.md'),
    );
    await generatePages(
      [path.join(packagesPath, '/*')],
      [{ docsPath, name: 'docs', urlPath: 'docs' }],
      packageRoot,
      componentsPath,
    );

    expect(fs.existsSync(firstDocsPage)).toEqual(false);
  });

  it('should remove files from docs pages that are removed from disc on rerun', async () => {
    const firstDocsPage = path.join(pagesPath, 'docs', 'doc-1.js');
    await generatePages(
      [packagesPath],
      [{ docsPath, name: 'docs', urlPath: 'docs' }],
      packageRoot,
      componentsPath,
    );
    expect(fs.existsSync(firstDocsPage)).toEqual(true);

    fs.unlinkSync(path.join(docsPath, 'doc-1.md'));
    await generatePages(
      [path.join(packagesPath, '/*')],
      [{ docsPath, name: 'docs', urlPath: 'docs' }],
      packageRoot,
      componentsPath,
    );

    expect(fs.existsSync(firstDocsPage)).toEqual(false);
  });
});

describe('Missing docs folder', () => {
  let sitemap;

  beforeAll(async () => {
    sitemap = await runGeneratePages({
      docsFixture: '',
      docsList: [{ docsPath: 'path/that/does/not/exist', name: 'docs' }],
      packagesFixture: 'simple-mock-packages',
    });
  });

  it('should return the docs sitemap as undefined', () => {
    expect(sitemap.docs).toBeUndefined();
  });
});

describe('readmes in the docs', () => {
  let sitemap;

  beforeAll(async () => {
    sitemap = await runGeneratePages({
      docsFixture: 'docs-with-readme',
      packagesFixture: 'simple-mock-packages',
    });
  });
  it('should have collapsed the readmes into indexes', () => {
    const readmePages = sitemap.docs.filter(({ pagePath }) =>
      pagePath.toLowerCase().includes('readme'),
    );

    expect(readmePages).toEqual([
      {
        children: [
          {
            children: [],
            id: 'doc-3-2',
            pagePath: '/docs/doc-3/doc-3-2/README',
          },
        ],
        id: 'doc-3',
        pagePath: '/docs/doc-3/readme',
      },
    ]);
  });
});

describe('Additional items in the docs tests', () => {
  let pagesPath;
  let packageRoot;

  beforeAll(async () => {
    packageRoot = await createTempDir();
    pagesPath = path.join(packageRoot, 'pages');
    await runGeneratePages({
      docsFixture: 'mock-docs-with-guides',
      docsList: [
        { docsPath: 'docs', name: 'docs', urlPath: 'docs' },
        { docsPath: 'guides', name: 'guides', urlPath: 'guides' },
      ],
      packagesFixture: 'simple-mock-packages',
      packageRoot,
    });
  });

  it('creates pages for each markdown file in docs and guides folder', () => {
    expect(fs.existsSync(path.join(pagesPath, 'docs', 'testdoc.js'))).toEqual(
      true,
    );
    expect(
      fs.existsSync(path.join(pagesPath, 'guides', 'testguide.js')),
    ).toEqual(true);
  });
});

describe('Generate readme page at the root level', () => {
  let pagesPath;
  let packageRoot;
  let sitemap;

  beforeAll(async () => {
    packageRoot = await createTempDir();
    pagesPath = path.join(packageRoot, 'pages');
    sitemap = await runGeneratePages({
      docsList: [{ docsPath: 'guides', name: 'playbooks', urlPath: 'guides' }],
      docsFixture: 'mock-docs-with-guides',
      packagesFixture: 'mock-package-with-root-readme',
      packageReadme: 'README.md',
      packageRoot,
    });
  });

  it('creates a readme page for the root level file', () => {
    expect(fs.existsSync(path.join(pagesPath, 'readme.js'))).toEqual(true);
  });

  it('adds top-level readme entry to sitemap', () => {
    expect(sitemap.readme).toBeDefined();
    expect(sitemap.readme).toEqual(expect.any(Array));
    expect(sitemap.readme).toHaveLength(2);
  });

  it('adds packages to readme nav', () => {
    expect(sitemap.readme[0]).toEqual({
      id: 'packages',
      pagePath: '/packages',
    });
  });

  it('adds root docs page to readme nav with correct id and page path', () => {
    expect(sitemap.readme[1]).toEqual({
      id: 'playbooks',
      pagePath: '/guides',
    });
  });
});

describe('Generate pages for nested packages', () => {
  let sitemap;

  beforeAll(async () => {
    sitemap = await runGeneratePages({
      docsList: [],
      docsFixture: 'simple-mock-docs',
      packagesFixture: 'mock-nested-group-packages',
      packageGlob: '/**/*',
    });
  });

  it('adds parentIds for all the nested packages', () => {
    expect(sitemap.packages[0].parentId).toBeUndefined();
    expect(sitemap.packages[1].parentId).toEqual('sub-folder');
  });
});
