import path from 'path';
import titleCase from 'title-case';

import {
  ChangelogPage,
  DocPage,
  ExamplePage,
  GenericPage,
} from '../common/page-specs';

import generateDocsInfo, {
  DocsTree,
  DocsSitemapEntry,
} from './generate-docs-info';

import generateExamplesInfo, {
  ExampleItem,
  ExampleTreeNode,
  ExampleSitemapEntry,
} from './generate-examples-info';

interface PackageInfo {
  id: string;
  name: string;
  // Extra package.json fields to display
  customPackageFields: {
    [field: string]: any;
  };
  // Absolute path to the README of the package
  readmePath: string;
  // Metdata extracted from the README frontmatter
  readmeMeta: object;
  // Display name for the package. This can be removed during Links refactor.
  packageTitle?: string;
  // Absolute path to the changelog for the package
  changelogPath?: string;
  // Nested docs for this package
  docs: DocsTree[];
  // Top level examples for this package
  examples: ExampleItem[];
  // Tree of inner package examples
  subExamples: ExampleTreeNode[];
}

export interface PackageGroup {
  // An id for the group pf packages. Package groups are specified in the
  // website config as file patterns.
  groupId?: string;
  packages: PackageInfo[];
}

// A structure representing the content in the website about a single package
interface PackageSitemap {
  parentId?: string;
  packageId: string;
  homePath: string;
  homeMeta: object;
  changelogPath: string | null;
  docPath: string;
  examplePath: string;
  docs: DocsSitemapEntry[];
  examples: ExampleSitemapEntry[];
  subExamples: ExampleSitemapEntry[];
  // Display name for the package to show in the nav etc
  packageTitle?: string; // this can be removed during Links refactor.
}

// Extra info about packages used by the website outside the sitemap.
interface PackageMeta {
  // id of a package
  id: string;
  // names of extra fields to be displayed in the website
  customPackageFields: string[];
  // data from package fields specified by customPackageFields
  [customField: string]: any;
}

/**
 * Generates pages and website info for a single package
 */
const generatePackageInfo = (
  pkg: PackageInfo,
  groupId?: string,
): {
  sitemap: PackageSitemap;
  meta: PackageMeta;
  pages: {
    homePage: DocPage;
    changelogPage?: ChangelogPage;
    docsPages: DocPage[];
    docsHomePages: GenericPage[];
    examplesHomePage: GenericPage;
    examplePages: ExamplePage[];
  };
} => {
  // Extra data to be put in all the pages
  const pageData = { id: pkg.id, packageName: pkg.name };

  const meta = {
    id: pkg.id,
    customPackageFields: Object.keys(pkg.customPackageFields),
    ...pkg.customPackageFields,
  };

  const homePath = path.join('packages', pkg.id);
  const homePage: DocPage = {
    websitePath: homePath,
    markdownPath: pkg.readmePath,
    pageData: {
      ...pageData,
      ...pkg.customPackageFields,
      customPackageFields: Object.keys(pkg.customPackageFields),
    },
    meta: { title: titleCase(pkg.id) },
  };

  const env = process.env.NODE_ENV || 'development';
  const displayChangelog = pkg.changelogPath || env === 'development';

  let changelogPage: ChangelogPage | undefined;
  const changelogPath = path.join(homePath, 'changelog');
  if (displayChangelog) {
    changelogPage = {
      websitePath: changelogPath,
      changelogPath: pkg.changelogPath,
      pageData,
      title: 'Changelog',
    };
  }

  const docPath = path.join(homePath, 'docs');
  const docsInfo = generateDocsInfo(pkg.docs, docPath, pageData);

  const docsHomePages = [
    {
      websitePath: docPath,
      pageData,
      title: 'Documents',
    },
    ...docsInfo.pages.docsHomePages,
  ];

  const examplePath = path.join(homePath, 'examples');
  const examplesHomePage: GenericPage = {
    websitePath: examplePath,
    pageData,
    title: 'Examples',
  };

  const examplePages: ExamplePage[] = [];

  const examplesPath = path.join(homePath, 'examples');
  const examplesInfo = generateExamplesInfo(
    pkg.examples,
    examplesPath,
    pageData,
  );

  examplePages.push(...examplesInfo.pages.examplePages);

  const subExamplesPath = path.join(homePath, 'subExamples');
  const subExamplesInfo = generateExamplesInfo(
    pkg.subExamples,
    subExamplesPath,
    pageData,
  );

  examplePages.push(...subExamplesInfo.pages.examplePages);

  // const docs = scanAndGenerate(pkg.docsPaths, path.join(homePath, 'docs'), {
  //   ...generatorConfig,
  //   pageData,
  //   type: 'pkg-doc',
  // });

  // const examples = pkg.examplesPaths.map(example => {
  //   const pagePath = path.join(homePath, 'examples', example.id);
  //
  //   const rawPagesPath = path.join(homePath, 'examples/isolated', example.id);
  //   const isolatedPath = path.join('/', `${rawPagesPath}`);
  //   const pageTitle = titleCase(example.id);
  //
  //   generateExamplePage(
  //     `${pagePath}.js`,
  //     `${rawPagesPath}.js`,
  //     example.path,
  //     { ...pageData, isolatedPath, pageTitle },
  //     generatorConfig,
  //     pageTitle,
  //   );
  //
  //   return {
  //     id: example.id,
  //     pagePath: path.join('/', pagePath),
  //     isolatedPath,
  //   };
  // });

  // const subExamples = pkg.subExamplesPaths.map(example => {
  //   const pagePath = path.join(
  //     homePath,
  //     `subExamples/${example.id}`,
  //     'examples',
  //   );
  //
  //   const rawPagesPath = path.join(
  //     homePath,
  //     `subExamples/${example.id}/isolated`,
  //     'examples',
  //   );
  //   const isolatedPath = path.join('/', `${rawPagesPath}`);
  //
  //   generateExamplePage(
  //     `${pagePath}.js`,
  //     `${rawPagesPath}.js`,
  //     example.path,
  //     { ...pageData, isolatedPath },
  //     generatorConfig,
  //     'Examples',
  //   );
  //
  //   return {
  //     id: `${example.id}/examples`,
  //     pagePath: path.join('/', pagePath),
  //     isolatedPath,
  //     folderPath: example.id,
  //   };
  // });

  /**
   * Recursively scans through the folder structure from folder path and generate children
   * for each sub example
   * @param folders the folder array
   * @param children
   * @param subExample each item in subExample
   */
  // const processSubExamples = (folders, children, subExample) => {
  //   const [folder, ...rest] = folders;
  //   const requiresFurtherNesting = !!rest.length;
  //
  //   let addToFolder = children.find(child => child.id === folder);
  //   if (!addToFolder) {
  //     children.push({
  //       id: folder,
  //       children: [],
  //     });
  //     addToFolder = children.find(child => child.id === folder);
  //   }
  //
  //   if (requiresFurtherNesting) {
  //     processSubExamples(rest, addToFolder.children, subExample);
  //   } else {
  //     // When it reach the last element add it as a plain object and delete the [] children array.
  //     addToFolder.pagePath = subExample.pagePath;
  //     addToFolder.isolatedPath = subExample.isolatedPath;
  //     delete addToFolder.children;
  //   }
  // };

  /**
   * Recursively scans through the top level sub examples and generate a tree structure
   * @returns array like sub examples structure
   */
  // const formatSubExamples = () => {
  //   const formatted = [];
  //   subExamples.forEach(subExample => {
  //     const folders = subExample.id.split('/').filter(Boolean);
  //     processSubExamples(folders, formatted, subExample);
  //   });
  //
  //   return formatted;
  // };
  //

  const sitemap: PackageSitemap = {
    parentId: groupId,
    packageId: pkg.id,
    homePath: path.join('/', homePath),
    homeMeta: pkg.readmeMeta,
    changelogPath: displayChangelog ? path.join('/', changelogPath) : null,
    docPath: path.join('/', docPath),
    examplePath: path.join('/', examplePath),
    docs: docsInfo.sitemap,
    examples: examplesInfo.sitemap,
    subExamples: subExamplesInfo.sitemap,
    packageTitle: pkg.packageTitle, // this can be removed during Links refactor.
  };

  const pages = {
    homePage,
    changelogPage,
    docsPages: docsInfo.pages.docsPages,
    docsHomePages,
    examplesHomePage,
    examplePages,
  };

  return { sitemap, meta, pages };
};

interface PackagePages {
  packageHomePages: DocPage[];
  changelogPages: ChangelogPage[];
  docsPages: DocPage[];
  docsHomePages: GenericPage[];
  examplesHomePages: GenericPage[];
  examplesPages: ExamplePage[];
}

export default (
  packageGroups: PackageGroup[],
): { sitemap: PackageSitemap[]; meta: PackageMeta[]; pages: PackagePages } => {
  const pages: PackagePages = {
    packageHomePages: [],
    changelogPages: [],
    docsPages: [],
    docsHomePages: [],
    examplesHomePages: [],
    examplesPages: [],
  };

  const sitemap: PackageSitemap[] = [];
  const meta: PackageMeta[] = [];

  // Flatten the website info from all the packages
  packageGroups.forEach(({ groupId, packages }) => {
    packages.forEach(pkg => {
      const packageInfo = generatePackageInfo(pkg, groupId);

      sitemap.push(packageInfo.sitemap);
      meta.push(packageInfo.meta);

      pages.examplesHomePages.push(packageInfo.pages.examplesHomePage);
      pages.docsPages.push(...packageInfo.pages.docsPages);
      pages.docsHomePages.push(...packageInfo.pages.docsHomePages);
      pages.packageHomePages.push(packageInfo.pages.homePage);
      pages.examplesPages.push(...packageInfo.pages.examplePages);

      if (packageInfo.pages.changelogPage) {
        pages.changelogPages.push(packageInfo.pages.changelogPage);
      }
    });
  });

  return {
    sitemap,
    meta,
    pages,
  };
};
