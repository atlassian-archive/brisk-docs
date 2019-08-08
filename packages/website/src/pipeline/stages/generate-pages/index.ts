import createStage from '../make-pipeline-stage';
import { PagesSpec, GenericPage } from '../common/page-specs';

// @ts-ignore: Importing non-ts file with no definition
const pageWriters = require('./page-writers');

const {
  generatePackageDocPage,
  generateProjectDocPage,
  generateDocsHomePage,
  generateDocumentsMainPage,
  generateExamplesHomePage,
  generateExamplePage,
  generateChangelogPage,
  generateHomePage,
  addBasePages,
  cleanPages,
} = pageWriters;

export type StageInput = {
  // Absolute path to directory containing page wrapper components
  wrappersPath: string;
  // Absolute path to the output pages directory
  pagesPath: string;
  // The absolute path to the root of the package.
  packageRoot: string;
} & PagesSpec;

export type StageOutput = void;

const generateGenericPage = (
  generateFn: (
    pagePath: string,
    pageData: Object,
    config: { pagesPath: string; wrappersPath: string },
    title?: string,
  ) => void,
  { websitePath, pageData, title }: GenericPage,
  config: { pagesPath: string; wrappersPath: string },
) => {
  generateFn(`${websitePath}.js`, pageData, config, title);
};

export default createStage(
  'generate-pages',
  async (input: StageInput): Promise<StageOutput> => {
    const { pagesPath, wrappersPath } = input;
    await cleanPages(pagesPath);
    await addBasePages(input.packageRoot, pagesPath);

    const generatorConfig = { pagesPath, wrappersPath };

    input.packageDocPages.forEach(
      ({ websitePath, markdownPath, meta, pageData }) => {
        generatePackageDocPage(
          `${websitePath}.js`,
          markdownPath,
          pageData,
          generatorConfig,
          meta,
        );
      },
    );

    input.projectDocPages.forEach(
      ({ websitePath, markdownPath, meta, pageData }) => {
        generateProjectDocPage(
          `${websitePath}.js`,
          markdownPath,
          pageData,
          generatorConfig,
          meta,
        );
      },
    );

    input.examplePages.forEach(
      ({
        websitePath,
        fullscreenExampleWebsitePath,
        exampleModulePath,
        pageData,
        title,
      }) => {
        generateExamplePage(
          `${websitePath}.js`,
          `${fullscreenExampleWebsitePath}.js`,
          exampleModulePath,
          pageData,
          generatorConfig,
          title,
        );
      },
    );

    input.changelogPages.forEach(
      ({ websitePath, changelogPath, pageData, title }) => {
        generateChangelogPage(
          `${websitePath}.js`,
          changelogPath,
          pageData,
          generatorConfig,
          title,
        );
      },
    );

    input.packageHomePages.forEach(
      ({ websitePath, markdownPath, meta, pageData }) => {
        generateHomePage(
          `${websitePath}.js`,
          markdownPath,
          pageData,
          generatorConfig,
          meta,
        );
      },
    );

    input.docsHomePages.forEach(page => {
      generateGenericPage(generateDocsHomePage, page, generatorConfig);
    });

    input.docsMainPages.forEach(page => {
      generateGenericPage(generateDocumentsMainPage, page, generatorConfig);
    });

    input.examplesHomePages.forEach(page => {
      generateGenericPage(generateExamplesHomePage, page, generatorConfig);
    });
  },
);
