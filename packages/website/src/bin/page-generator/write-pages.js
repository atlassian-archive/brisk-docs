const fs = require('fs-extra');
const path = require('path');

const {
  changelogTemplate,
  exampleTemplate,
  singleComponentTemplate,
  wrappedComponentTemplate,
  exampleWithDecoratorTemplate,
} = require('./templates');

const writeFile = (pagePath, content) => {
  fs.ensureFileSync(pagePath);
  fs.writeFileSync(pagePath, content);
};

/**
 * Generates an import path to a destination file relative from a given path
 * @param from absolute path of the js file doing the import
 * @param to absolute path of the file being imported
 */
const getImportPath = (from, to) => {
  const fromDir = path.dirname(from);
  return path.relative(fromDir, to).replace('.js', '');
};

const getGenericPageInfo = (
  pagesPath,
  pagePath,
  componentPath,
  wrappersPath,
  wrapperName,
  decoratorPath,
) => {
  const absolutePagePath = path.resolve(pagesPath, pagePath);
  const componentImportPath = componentPath
    ? getImportPath(absolutePagePath, componentPath)
    : undefined;
  const packageHomeWrapperPath = getImportPath(
    absolutePagePath,
    path.join(wrappersPath, `${wrapperName}.js`),
  );
  const decoratorImportPath =
    decoratorPath && decoratorPath.length > 0
      ? getImportPath(absolutePagePath, decoratorPath)
      : undefined;

  return {
    absolutePagePath,
    componentImportPath,
    packageHomeWrapperPath,
    decoratorImportPath,
  };
};

const generateBasicPage = (
  pagePath,
  componentPath,
  data,
  wrapperName,
  { wrappersPath, pagesPath },
  title = '',
) => {
  const { componentImportPath, packageHomeWrapperPath } = getGenericPageInfo(
    pagesPath,
    pagePath,
    componentPath,
    wrappersPath,
    wrapperName,
  );

  const templateData = { ...data, pageTitle: title };

  const source = componentImportPath
    ? wrappedComponentTemplate(
        componentImportPath,
        packageHomeWrapperPath,
        templateData,
      )
    : singleComponentTemplate(packageHomeWrapperPath, templateData);

  writeFile(path.join(pagesPath, pagePath), source);
};

const generateNonComponentPage = (
  pagePath,
  data,
  wrapperName,
  { wrappersPath, pagesPath },
  type,
  title,
) => {
  const absolutePagePath = path.resolve(pagesPath, pagePath);
  const packageHomeWrapperPath = getImportPath(
    absolutePagePath,
    path.join(wrappersPath, `${wrapperName}.js`),
  );

  writeFile(
    path.join(pagesPath, pagePath),
    singleComponentTemplate(packageHomeWrapperPath, {
      ...data,
      pageTitle: title,
      pageType: type,
    }),
  );
};

const generateHomePage = (pagePath, readmePath, data, config, title = '') => {
  generateBasicPage(pagePath, readmePath, data, 'package-home', config, title);
};

const generateChangelogPage = (
  pagePath,
  changelogPath,
  data,
  config,
  title = '',
) => {
  const componentPath = changelogPath;
  const wrapperName = 'package-changelog';
  const { wrappersPath, pagesPath } = config;

  const { componentImportPath, packageHomeWrapperPath } = getGenericPageInfo(
    pagesPath,
    pagePath,
    componentPath,
    wrappersPath,
    wrapperName,
  );

  const source = componentImportPath
    ? changelogTemplate(
        componentImportPath,
        packageHomeWrapperPath,
        data,
        title,
      )
    : singleComponentTemplate(packageHomeWrapperPath, data, title);

  writeFile(path.join(pagesPath, pagePath), source);
};

const generatePackageDocPage = (
  pagePath,
  markdownPath,
  data,
  config,
  title = '',
) => {
  generateBasicPage(
    pagePath,
    markdownPath,
    data,
    'package-docs',
    config,
    title,
  );
};

const generateExamplePage = (
  pagePath,
  rawPagesPath,
  exampleModulePath,
  data,
  config,
  title = '',
) => {
  const componentPath = exampleModulePath;
  const wrapperName = 'package-example';
  const { wrappersPath, pagesPath, decoratorPath } = config;

  const {
    componentImportPath,
    packageHomeWrapperPath,
    decoratorImportPath,
  } = getGenericPageInfo(
    pagesPath,
    pagePath,
    componentPath,
    wrappersPath,
    wrapperName,
    decoratorPath,
  );

  const pageData = { ...data, pageTitle: title };

  writeFile(
    path.join(pagesPath, pagePath),
    decoratorImportPath
      ? exampleWithDecoratorTemplate(
          componentImportPath,
          packageHomeWrapperPath,
          pageData,
          decoratorImportPath,
        )
      : exampleTemplate(componentImportPath, packageHomeWrapperPath, pageData),
  );

  writeFile(
    path.join(pagesPath, rawPagesPath),
    singleComponentTemplate(path.join('..', componentImportPath), pageData),
  );
};

const generateDocsHomePage = (pagePath, data, config, title = '') => {
  generateNonComponentPage(pagePath, data, 'item-list', config, 'docs', title);
};

const generateDocumentsMainPage = (pagePath, data, config, title = '') => {
  generateNonComponentPage(
    pagePath,
    data,
    'documents-index',
    config,
    'docs',
    title,
  );
};

const generateExamplesHomePage = (pagePath, data, config, title = '') => {
  generateNonComponentPage(
    pagePath,
    data,
    'item-list',
    config,
    'examples',
    title,
  );
};

const generateProjectDocPage = (
  pagePath,
  markdownPath,
  data,
  config,
  title = '',
) => {
  generateBasicPage(
    pagePath,
    markdownPath,
    data,
    'project-docs',
    config,
    title,
  );
};

module.exports = {
  generateHomePage,
  generateChangelogPage,
  generatePackageDocPage,
  generateExamplePage,
  generateDocsHomePage,
  generateExamplesHomePage,
  generateProjectDocPage,
  generateDocumentsMainPage,
};
