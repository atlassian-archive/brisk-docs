import path from 'path';
import flatMap from 'lodash.flatmap';
import titleCase from 'title-case';

import {
  ChangelogPage,
  DocPage,
  ExamplePage,
  GenericPage,
} from '../common/page-specs';


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
  // Docs tree for this package
  // docs: DocsTree;
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
  // docs: {}[];
  // examples: {}[];
  // subExamples: {}[];
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

const generatePackageInfo = (
  pkg: PackageInfo,
  groupId?: string,
): {
  sitemap: PackageSitemap;
  meta: PackageMeta;
  pages: {
    homePage: DocPage;
    changelogPage?: ChangelogPage;
    docsHomePage: GenericPage;
    examplesHomePage: GenericPage;
  };
} => {
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
  const docsHomePage = {
    websitePath: docPath,
    pageData,
    title: 'Documents',
  };

  const examplePath = path.join(homePath, 'examples');
  const examplesHomePage: GenericPage = {
    websitePath: examplePath,
    pageData,
    title: 'Examples',
  };

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
    // docs,
    // examples,
    // subExamples: formatSubExamples(),
    packageTitle: pkg.packageTitle, // this can be removed during Links refactor.
  };

  const pages = {
    homePage,
    changelogPage,
    docsHomePage,
    examplesHomePage
  };

  return { sitemap, meta, pages };
};

interface PackagePages {
  packageHomePages: DocPage[];
  changelogPages: ChangelogPage[];
  docsHomePages: GenericPage[];
  examplesHomePages: GenericPage[];
}

export default (
  packageGroups: PackageGroup[],
): { sitemap: PackageSitemap[]; meta: PackageMeta[]; pages: PackagePages } => {
  const packagesInfo = flatMap(packageGroups, ({ groupId, packages }) => {
    return packages.map(p => generatePackageInfo(p, groupId));
  });

  // @ts-ignore: Typescript doesnt understand filtering out undefined
  const changelogPages: ChangelogPage[] = packagesInfo
    .map(i => i.pages.changelogPage)
    .filter(p => p);

  return {
    sitemap: packagesInfo.map(i => i.sitemap),
    meta: packagesInfo.map(i => i.meta),
    pages: {
      packageHomePages: packagesInfo.map(i => i.pages.homePage),
      changelogPages,
      docsHomePages: packagesInfo.map(i => i.pages.docsHomePage),
      examplesHomePages: packagesInfo.map(i => i.pages.examplesHomePage),
    },
  };
};
