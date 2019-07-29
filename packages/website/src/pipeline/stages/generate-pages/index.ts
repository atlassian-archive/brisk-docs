import createStage from '../make-pipline-stage';
import {
  ChangelogPage,
  DocPage,
  ExamplePage,
  GenericPage,
} from '../common/page-specs';

import {
  generatePackageDocPage,
  generateProjectDocPage,
  generateDocsHomePage,
  generateDocumentsMainPage,
  generateExamplesHomePage,
  generateExamplePage,
  generateChangelogPage,
  generateHomePage,
  // @ts-ignore: Implicit any
} from './page-writers';

export interface StageInput {
  // Absolute path to directory containing page wrapper components
  wrappersPath: string;
  // Absolute path to the output pages directory
  pagesPath: string;
  // List of package level docs to be generated
  packageDocPages: DocPage[];
  // List of project level docs to be generated
  projectDocPages: DocPage[];
  // List of docs index pages to be generated.
  docsHomePages: GenericPage[];
  // List of home pages for docs sections
  docsMainPages: GenericPage[];
  // List of examples to be generated
  examplePages: ExamplePage[];
  // List of examples index pages to be generated.
  examplesHomePages: GenericPage[];
  // List of changelogs to be generated
  changelogPages: ChangelogPage[];
  // List of package landing pages to be generated
  packageHomePages: DocPage[];
}

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
          title
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
