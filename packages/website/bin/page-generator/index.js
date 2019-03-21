const path = require('path');

const rimraf = require('rimraf');
const titleCase = require('title-case');
const getPackageInfo = require('./get-package-info');
const getDocsInfo = require('./get-docs-info');
const getExternalModuleBuilder = require('./build-externals');
const {
  generateHomePage,
  generatePackageDocPage,
  generateExamplePage,
  generateDocsHomePage,
  generateExamplesHomePage,
  generateProjectDocPage,
} = require('./templates');

const packagesData = [];

/**
 * Maps over all packages and creates website pages for each
 * @param packageInfo data representing the packages that exist
 * @param generatorConfig info about the locations of important directories used for page generation
 * @returns a sitemap of all the pages created
 */
function generatePackagePages(packageInfo, generatorConfig) {
  const packageSitemap = packageInfo.map(pkg => {
    const pageData = { id: pkg.id, packageName: pkg.name };
    const homePageData = {
      description: pkg.description,
      version: pkg.version,
      maintainers: pkg.maintainers,
      repository: pkg.repository,
    };
    packagesData.push({ id: pkg.id, ...homePageData });
    const homePath = path.join('packages', pkg.id);
    generateHomePage(
      path.join(homePath, 'index.js'),
      pkg.readmePath,
      { ...pageData, ...homePageData },
      generatorConfig,
      titleCase(pkg.id),
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

    const docs = pkg.docsPaths.map(doc => {
      const pagePath = path.join(homePath, 'docs', doc.id);
      generatePackageDocPage(
        `${pagePath}.js`,
        doc.path,
        pageData,
        generatorConfig,
        titleCase(doc.id),
      );

      return { id: doc.id, pagePath: path.join('/', pagePath) };
    });

    const examples = pkg.examplesPaths.map(example => {
      const pagePath = path.join(homePath, 'examples', example.id);

      const rawPagesPath = path.join(homePath, 'examples/isolated', example.id);
      const isolatedPath = path.join('/', `${rawPagesPath}`);

      generateExamplePage(
        `${pagePath}.js`,
        `${rawPagesPath}.js`,
        example.path,
        { ...pageData, isolatedPath },
        generatorConfig,
        titleCase(example.id),
      );

      return {
        id: example.id,
        pagePath: path.join('/', pagePath),
        isolatedPath,
      };
    });

    return {
      packageId: pkg.id,
      homePath: path.join('/', homePath),
      docPath: path.join('/', docPath),
      examplePath: path.join('/', examplePath),
      docs,
      examples,
    };
  });
  return packageSitemap;
}

/**
 * Recursively scans through the top level docs structure and generates pages
 * for each markdown file
 * @param docsInfo info about the docs markdown that exist in the project
 * @param generatorConfig info about the locations of important directories used for page generation
 * @returns sitemap for the generated docs pages
 */
const generateProjectDocsPages = (docsInfo, generatorConfig) => {
  const scanAndGenerate = (docs, docsPath) =>
    docs.map(doc => {
      const pagePath = path.join(docsPath, doc.id);

      if (doc.children) {
        const docData = {
          id: doc.id,
          children: doc.children.map(child => ({
            id: child.id,
            pagePath: path.join(doc.id, child.id),
          })),
        };
        generateDocsHomePage(
          path.join(pagePath, 'index.js'),
          docData,
          generatorConfig,
          'Documents',
        );

        return {
          id: doc.id,
          pagePath: path.join('/', pagePath),
          children: scanAndGenerate(doc.children, path.join(docsPath, doc.id)),
        };
      }

      generateProjectDocPage(
        `${pagePath}.js`,
        doc.path,
        {},
        generatorConfig,
        titleCase(doc.id),
      );

      return {
        id: doc.id,
        pagePath: path.join('/', pagePath),
      };
    });

  return scanAndGenerate(docsInfo, 'docs');
};

/**
 * Clean up packages and docs so we don't have ghost pages
 * @param pagesPath the absolute path to the `/pages` directory in next
 */
const cleanPages = pagesPath => {
  // This error handling should likely be lifted to when we start executing the whole thing
  if (typeof pagesPath !== 'string' || pagesPath.length < 1) {
    throw new Error(
      "We were worried we were going to erase files from the wrong place so we're stopping",
    );
  }
  const oldPackagePages = path.join(pagesPath, 'packages');
  const oldDocsPages = path.join(pagesPath, 'docs');
  rimraf.sync(oldPackagePages);
  rimraf.sync(oldDocsPages);
};

/**
 * generates all the pages needed for the docs website
 * @param packagesPaths a list of directory path patterns to be scanned
 * @param docsPath directory path to the project docs
 * @param pagesPath path to the output pages directory
 * @param componentsPath path to helper components/wrappers
 * @param bundlesPath path to where built external code is located
 * @param options configuration options
 *
 * @returns a promise resolving to an object representing the
 * sitemap of the pages created
 */
module.exports = async function generatePages(
  packagesPaths,
  docsPath,
  pagesPath,
  componentsPath,
  options = {},
) {
  cleanPages(pagesPath);

  const packageInfo = getPackageInfo(packagesPaths, {
    useManifests: options.useManifests,
  });
  const docsInfo = getDocsInfo(docsPath);

  const generatorConfig = {
    pagesPath,
    wrappersPath: componentsPath,
  };

  const packageSitemap = generatePackagePages(packageInfo, generatorConfig);
  const docsSitemap = generateProjectDocsPages(docsInfo, generatorConfig);

  return {
    packages: packageSitemap,
    docs: docsSitemap,
    metaData: packagesData,
  };
};
