const fse = require('fs-extra');
const path = require('path');
const outdent = require('outdent');

const pageTitleAbsolutePath = path.resolve(
  __dirname,
  '../../../components/page-title',
);

const writeFile = (pagePath, content) => {
  fse.ensureFileSync(pagePath);
  fse.writeFileSync(pagePath, content);
};

const basicPageTemplate = (
  componentPath,
  wrapperPath,
  pageTitlePath,
  data = {},
  title = '',
) => {
  if (!componentPath) {
    return outdent`
      import React from 'react';
      import Wrapper from '${wrapperPath}';
      import PageTitle from '${pageTitlePath}';

      export default () => (
       <>
          <PageTitle title='${title}' />
          <Wrapper data={${JSON.stringify(data)}} />
       </>
      );
    `;
  }

  return outdent`
    import React from 'react';
    import Component from '${componentPath}';
    import Wrapper from '${wrapperPath}';
    import PageTitle from '${pageTitlePath}';

    export default () => (
     <>
        <PageTitle title='${title}' />
            <Wrapper data={${JSON.stringify(data)}}>
                <Component />
            </Wrapper>
     </>
    );
  `;
};

const exampleTemplate = (
  componentPath,
  wrapperPath,
  pageTitlePath,
  data = {},
  title = '',
) => outdent`
    import React from 'react';
    import Component from '${componentPath}';
    import fileContents from '!!raw-loader!${componentPath}';

    import Wrapper from '${wrapperPath}';
    import PageTitle from '${pageTitlePath}';

    export default () => (
        <>
            <PageTitle title='${title}' />
            <Wrapper data={${JSON.stringify(data)}} fileContents={fileContents}>
                <Component />
            </Wrapper>
        </>
    );
`;

const rawTemplate = componentPath => outdent`
import React from 'react';
import Component from '${componentPath}'

export default () => <Component />
`;

const basicNonComponentTemplate = (
  wrapperPath,
  pageTitlePath,
  data = {},
  type,
  title = '',
) => outdent`
    import React from 'react';
    import Wrapper from '${wrapperPath}';
    import PageTitle from '${pageTitlePath}';

    export default () => (
        <>
           <PageTitle title='${title}' />
           <Wrapper data={${JSON.stringify(data)}} type='${type}' />
        </>
    );
`;

/**
 * Generates an import path to a destination file relative from a given path
 * @param from absolute path of the js file doing the import
 * @param to absolute path of the file being imported
 */
const getImportPath = (from, to) => {
  const fromDir = path.dirname(from);
  if (to === '') {
    return null;
  }
  return path.relative(fromDir, to).replace('.js', '');
};

const getGenericPageInfo = (
  pagesPath,
  pagePath,
  componentPath,
  wrappersPath,
  wrapperName,
) => {
  const absolutePagePath = path.resolve(pagesPath, pagePath);
  const componentImportPath = getImportPath(absolutePagePath, componentPath);
  const packageHomeWrapperPath = getImportPath(
    absolutePagePath,
    path.join(wrappersPath, `${wrapperName}.js`),
  );
  const pageTitleComponentPath = getImportPath(
    absolutePagePath,
    pageTitleAbsolutePath,
  );

  return {
    absolutePagePath,
    componentImportPath,
    packageHomeWrapperPath,
    pageTitleComponentPath,
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
  const {
    componentImportPath,
    packageHomeWrapperPath,
    pageTitleComponentPath,
  } = getGenericPageInfo(
    pagesPath,
    pagePath,
    componentPath,
    wrappersPath,
    wrapperName,
  );

  writeFile(
    path.join(pagesPath, pagePath),
    basicPageTemplate(
      componentImportPath,
      packageHomeWrapperPath,
      pageTitleComponentPath,
      data,
      title,
    ),
  );
};

const generateNonComponentPage = (
  pagePath,
  data,
  wrapperName,
  { wrappersPath, pagesPath },
  type,
  title = '',
) => {
  const absolutePagePath = path.resolve(pagesPath, pagePath);
  const packageHomeWrapperPath = getImportPath(
    absolutePagePath,
    path.join(wrappersPath, `${wrapperName}.js`),
  );

  const pageTitleComponentPath = getImportPath(
    absolutePagePath,
    pageTitleAbsolutePath,
  );

  writeFile(
    path.join(pagesPath, pagePath),
    basicNonComponentTemplate(
      packageHomeWrapperPath,
      pageTitleComponentPath,
      data,
      type,
      title,
    ),
  );
};

const generateHomePage = (pagePath, readmePath, data, config, title = '') => {
  generateBasicPage(pagePath, readmePath, data, 'package-home', config, title);
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
  const { wrappersPath, pagesPath } = config;

  const {
    componentImportPath,
    packageHomeWrapperPath,
    pageTitleComponentPath,
  } = getGenericPageInfo(
    pagesPath,
    pagePath,
    componentPath,
    wrappersPath,
    wrapperName,
  );

  writeFile(
    path.join(pagesPath, pagePath),
    exampleTemplate(
      componentImportPath,
      packageHomeWrapperPath,
      pageTitleComponentPath,
      data,
      title,
    ),
  );

  writeFile(
    path.join(pagesPath, rawPagesPath),
    rawTemplate(path.join('..', componentImportPath)),
  );
};

const generateDocsHomePage = (pagePath, data, config, title = '') => {
  generateNonComponentPage(pagePath, data, 'item-list', config, 'docs', title);
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
  generatePackageDocPage,
  generateExamplePage,
  generateDocsHomePage,
  generateExamplesHomePage,
  generateProjectDocPage,
};
