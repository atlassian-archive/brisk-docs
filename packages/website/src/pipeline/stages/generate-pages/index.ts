import createStage from '../make-pipline-stage';
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

interface GenericPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // Additional data used by the page
  pageData: object;
  // Window title for this page
  title?: string;
}

interface DocPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // An absolute path to the location of the user generated markdown content
  markdownPath: string;
  // Additional data used by the page
  pageData: object;
  // Metadata about the page
  meta: object;
}

interface ExamplePage {
  // The path the example page should appear at in the finished website
  websitePath: string;
  // The path the fullscreen example page should appear at in the finished website
  fullscreenExampleWebsitePath: string;
  // An absolute path to the location of the user generated example
  exampleModulePath: string;
  // Additional data used by the page
  pageData: object;
}

interface ChangelogPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // An absolute path to the location of the user generated changelogs
  changelogPath: string;
  // Additional data used by the page
  pageData: object;
  // Window title for this page
  title?: string;
}

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
  if (title) {
    generateFn(`${websitePath}.js`, pageData, config, title);
  } else {
    generateFn(`${websitePath}.js`, pageData, config);
  }
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
      }) => {
        generateExamplePage(
          `${websitePath}.js`,
          `${fullscreenExampleWebsitePath}.js`,
          exampleModulePath,
          pageData,
          generatorConfig,
        );
      },
    );

    input.changelogPages.forEach(
      ({ websitePath, changelogPath, pageData, title }) => {
        if (title) {
          generateChangelogPage(
            `${websitePath}.js`,
            changelogPath,
            pageData,
            generatorConfig,
            title,
          );
        } else {
          generateChangelogPage(
            `${websitePath}.js`,
            changelogPath,
            pageData,
            generatorConfig,
          );
        }
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
