const path = require('path');
const fs = require('fs-extra');

const titleCase = require('title-case');
const filenamify = require('filenamify');

const getPackageInfo = require('./get-package-info');
const getDocsInfo = require('./get-docs-info');
const {
  generateHomePage,
  generateChangelogPage,
  generatePackageDocPage,
  generateExamplePage,
  generateDocsHomePage,
  generateExamplesHomePage,
  generateProjectDocPage,
  generateDocumentsMainPage,
} = require('./write-pages');

const packagesData = [];

const scanAndGenerate = (docs, docsPath, generatorConfig, name) => {
  const pageData = generatorConfig.pageData || {};
  const generateDocFunc =
    generatorConfig.type === 'pkg-doc'
      ? generatePackageDocPage
      : generateProjectDocPage;

  return docs.map(doc => {
    const pagePath = path.join(docsPath, doc.id);

    if (doc.children) {
      const docData = {
        key: name,
        id: doc.id,
        children: doc.children.map(child => ({
          id: child.id,
          meta: child.meta,
          pagePath: path.join(doc.id, child.id),
        })),
      };

      generateDocsHomePage(
        path.join(pagePath, 'index.js'),
        { ...docData, ...pageData },
        generatorConfig,
        'Documents',
      );

      const readme = doc.children.find(
        c => c.path && c.path.toLowerCase().match(/readme\.md$/),
      );
      if (readme) {
        generateDocFunc(
          path.join(pagePath, readme.id, 'index.js'),
          readme.path,
          { key: name, ...pageData },
          generatorConfig,
          doc.meta,
        );
      }

      return {
        id: doc.id,
        meta: doc.meta,
        pagePath: path.join('/', pagePath, readme ? readme.id : ''),
        children: scanAndGenerate(
          doc.children.filter(c => !(c.id.toLowerCase() === 'readme')),
          path.join(docsPath, doc.id),
          generatorConfig,
          name,
        ),
      };
    }

    generateDocFunc(
      `${pagePath}.js`,
      doc.path,
      { key: name, ...pageData },
      generatorConfig,
      doc.meta,
    );

    return {
      id: doc.id,
      meta: doc.meta,
      pagePath: path.join('/', pagePath),
    };
  });
};
/**
 * Maps over all packages and creates website pages for each
 * @param packageInfo data representing the packages that exist
 * @param generatorConfig info about the locations of important directories used for page generation
 * @param patterns the base directories
 * @returns a sitemap of all the pages created
 */
function generatePackagePages(packageInfo, generatorConfig, patterns) {
  const packageSitemap = packageInfo.map(pkg => {
    const pageData = { id: pkg.id, packageName: pkg.name };

    // this is to find the sub-folders of packages.
    // const parentDir = patterns.find(d => pkg.pkgPath.indexOf(d) === 0);
    // const parentDir = patterns.find(d => pkg.pkgPath.match(`^${d}`));

    // const parent =
    //   parentDir &&
    //   pkg.pkgPath.substring(parentDir.length + 1, pkg.pkgPath.lastIndexOf('/'));
    // const parent = parentDir && pkg.pkgPath.match(`^${parentDir}/(.*)/.*`)[1];

    const parentDir = patterns
      .map(dir => pkg.pkgPath.match(`^${dir}/(.*)/.*`))
      .find(a => a);

    const parent = parentDir && parentDir[1];

    const homePageData = {};

    pkg.customPackageFields.forEach(field => {
      homePageData[field] = pkg[field];
    });

    packagesData.push({
      id: pkg.id,
      customPackageFields: pkg.customPackageFields,
      ...homePageData,
    });
    const homePath = path.join('packages', pkg.id);
    generateHomePage(
      path.join(homePath, 'index.js'),
      pkg.readmePath,
      {
        ...pageData,
        ...homePageData,
        customPackageFields: pkg.customPackageFields,
      },
      generatorConfig,
      { title: titleCase(pkg.id) },
    );

    const changelogPath = path.join(homePath, 'changelog');
    generateChangelogPage(
      `${changelogPath}.js`,
      pkg.changelogPath,
      pageData,
      generatorConfig,
      'Changelog',
    );

    const docPath = path.join(homePath, 'docs');
    generateDocsHomePage(
      path.join(docPath, 'index.js'),
      pageData,
      generatorConfig,
      'Documents',
    );

    const examplePath = path.join(homePath, 'examples');
    generateExamplesHomePage(
      path.join(examplePath, 'index.js'),
      pageData,
      generatorConfig,
      'Examples',
    );

    const docs = scanAndGenerate(pkg.docsPaths, path.join(homePath, 'docs'), {
      ...generatorConfig,
      pageData,
      type: 'pkg-doc',
    });

    const examples = pkg.examplesPaths.map(example => {
      const pagePath = path.join(homePath, 'examples', example.id);

      const rawPagesPath = path.join(homePath, 'examples/isolated', example.id);
      const isolatedPath = path.join('/', `${rawPagesPath}`);
      const pageTitle = titleCase(example.id);

      generateExamplePage(
        `${pagePath}.js`,
        `${rawPagesPath}.js`,
        example.path,
        { ...pageData, isolatedPath, pageTitle },
        generatorConfig,
        pageTitle,
      );

      return {
        id: example.id,
        pagePath: path.join('/', pagePath),
        isolatedPath,
      };
    });

    const subExamples = pkg.subExamplesPaths.map(example => {
      const pagePath = path.join(
        homePath,
        `subExamples/${example.id}`,
        'examples',
      );

      const rawPagesPath = path.join(
        homePath,
        `subExamples/${example.id}/isolated`,
        'examples',
      );
      const isolatedPath = path.join('/', `${rawPagesPath}`);

      generateExamplePage(
        `${pagePath}.js`,
        `${rawPagesPath}.js`,
        example.path,
        { ...pageData, isolatedPath },
        generatorConfig,
        'Examples',
      );

      return {
        id: `${example.id}/examples`,
        pagePath: path.join('/', pagePath),
        isolatedPath,
        folderPath: example.id,
      };
    });

    /**
     * Recursively scans through the folder structure from folder path and generate children
     * for each sub example
     * @param folders the folder array
     * @param children
     * @param subExample each item in subExample
     */
    const processSubExamples = (folders, children, subExample) => {
      const [folder, ...rest] = folders;
      const requiresFurtherNesting = !!rest.length;

      let addToFolder = children.find(child => child.id === folder);
      if (!addToFolder) {
        children.push({
          id: folder,
          children: [],
        });
        addToFolder = children.find(child => child.id === folder);
      }

      if (requiresFurtherNesting) {
        processSubExamples(rest, addToFolder.children, subExample);
      } else {
        // When it reach the last element add it as a plain object and delete the [] children array.
        addToFolder.pagePath = subExample.pagePath;
        addToFolder.isolatedPath = subExample.isolatedPath;
        delete addToFolder.children;
      }
    };

    /**
     * Recursively scans through the top level sub examples and generate a tree structure
     * @returns array like sub examples structure
     */
    const formatSubExamples = () => {
      const formatted = [];
      subExamples.forEach(subExample => {
        const folders = subExample.id.split('/').filter(Boolean);
        processSubExamples(folders, formatted, subExample);
      });

      return formatted;
    };

    const env = process.env.NODE_ENV || 'development';
    const displayChangelog = pkg.changelogPath || env === 'development';

    return {
      parentId: parent && parent !== '/' ? parent : undefined,
      packageId: pkg.id,
      homePath: path.join('/', homePath),
      homeMeta: pkg.readmeMeta,
      changelogPath: displayChangelog ? path.join('/', changelogPath) : null,
      docPath: path.join('/', docPath),
      examplePath: path.join('/', examplePath),
      docs,
      examples,
      subExamples: formatSubExamples(),
      packageTitle: pkg.pkgFile, // this can be removed during Links refactor.
    };
  });
  return packageSitemap;
}

/**
 * Recursively scans through the top level docs structure and generates pages
 * for each markdown file
 * @param docsInfo info about the docs markdown that exist in the project
 * @param generatorConfig info about the locations of important directories used for page generation
 * @param name name of the parent path
 * @returns sitemap for the generated docs pages
 */
const generateProjectDocsPages = (docsInfo, generatorConfig, name, urlPath) => {
  generateDocumentsMainPage(
    path.join(urlPath, 'index.js'),
    { key: name },
    generatorConfig,
    name,
  );

  return scanAndGenerate(docsInfo, urlPath, generatorConfig, name);
};

const addBasePages = async (packageRoot, pagesPath) => {
  const defaultPagesPath = path.join(packageRoot, 'default-pages');
  await fs.copy(defaultPagesPath, pagesPath);
};

const generateRootReadMePage = (
  pagePath,
  generatorConfig,
  docKeys,
  docUrlPaths,
) => {
  if (fs.existsSync(pagePath)) {
    generateProjectDocPage(
      'readme.js',
      pagePath,
      { key: 'readme' },
      generatorConfig,
      { title: 'readme' },
    );
    const navItems = [{ id: 'packages', pagePath: '/packages' }];

    return [
      ...navItems,
      ...docKeys.map((x, i) => ({ id: x, pagePath: `/${docUrlPaths[i]}` })),
    ];
  }

  return undefined;
};

/**
 * generates all the pages needed for the docs website
 * @param packagesPaths a list of directory path patterns to be scanned
 * @param docsList
 * @param pagesPath path to the output pages directory
 * @param componentsPath path to helper components/wrappers
 * @param options configuration options
 *
 * @param readMePath
 * @returns a promise resolving to an object representing the
 * schema of the pages created
 */
module.exports = async function generatePages(
  packagesPaths,
  docsList,
  packageRoot,
  componentsPath,
  options = {},
  readMePath,
) {
  const pagesPath = path.join(packageRoot, 'pages');
  await cleanPages(pagesPath);
  await addBasePages(packageRoot, pagesPath);

  const pkgOpts = {};

  // loose check to pass through `false` values
  if (options.showSubExamples != null) {
    pkgOpts.showSubExamples = options.showSubExamples;
  }
  if (options.showExamples != null) {
    pkgOpts.showExamples = options.showExamples;
  }
  if (options.customPackageFields) {
    pkgOpts.customPackageFields = options.customPackageFields;
  }

  const packageInfo = getPackageInfo(packagesPaths, pkgOpts);

  const generatorConfig = {
    pagesPath,
    wrappersPath: componentsPath,
  };

  const baseDirectories = packagesPaths
    ? packagesPaths.map(dir => dir.substring(0, dir.indexOf('/*')))
    : [];

  const packageSitemap = generatePackagePages(
    packageInfo,
    generatorConfig,
    baseDirectories,
  );
  const docsSitemap = {};

  docsList.forEach(item => {
    const docsInfo = getDocsInfo(item.docsPath);
    const { urlPath } = item;

    const pathName = filenamify(
      item.name
        .toLowerCase()
        .split(' ')
        .join('-'),
    );

    if (docsInfo) {
      docsSitemap[pathName] = generateProjectDocsPages(
        docsInfo,
        generatorConfig,
        pathName,
        urlPath,
      );
    }
  });

  const readme = generateRootReadMePage(
    readMePath,
    generatorConfig,
    Object.keys(docsSitemap),
    docsList.map(d => d.urlPath),
  );

  return {
    packages: packageSitemap,
    ...docsSitemap,
    metaData: packagesData,
    readme,
  };
};
