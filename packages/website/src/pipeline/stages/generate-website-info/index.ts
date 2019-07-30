import filenamify from 'filenamify';

import createStage from '../make-pipline-stage';
import generatePackageInfo, {
  PackageSitemap,
  PackageGroup,
  PackageMeta,
} from './generate-package-info';
import { DocPage, GenericPage, PagesSpec } from '../common/page-specs';
import generateDocsInfo, {
  DocsSitemapEntry,
  DocsTreeNode,
} from './generate-docs-info';

// A group of docs to be shown on the top level of the website
export interface ProjectDocsSection {
  name: string;
  docs: DocsTreeNode[];
  // User configurable path for where this group of docs should live on the website
  websitePath: string;
}

export interface StageInput {
  // A list of packages to create pages for, segmented into groups
  packages: PackageGroup[];
  // sections of docs
  projectDocs: ProjectDocsSection[];
  // Absolute path to the project's README
  readmePath: string;
}

interface ProjectDocsSitemap {
  [docId: string]: DocsSitemapEntry[];
}

interface Sitemap {
  packages: PackageSitemap[];
  docs: ProjectDocsSitemap;
  // data used by the readme nav
  readme?: {
    id: string;
    pagePath: string;
  }[];
}

export interface StageOutput {
  pages: PagesSpec;
  sitemap: Sitemap;
  packagesMeta: PackageMeta[];
}

export default createStage(
  'generate-website-info',
  async ({
    packages,
    projectDocs,
    readmePath,
  }: StageInput): Promise<StageOutput> => {
    const packageInfo = generatePackageInfo(packages);

    const projectDocsSitemap: ProjectDocsSitemap = {};
    const projectDocsHomePages: GenericPage[] = [];
    const projectDocPages: DocPage[] = [];
    const docsMainPages: GenericPage[] = [];

    const readmeSitemap = [{ id: 'packages', pagePath: '/packages' }];

    projectDocs.forEach(({ name, websitePath, docs }) => {
      const docsKey = filenamify(
        name
          .toLowerCase()
          .split(' ')
          .join('-'),
      );

      docsMainPages.push({
        websitePath,
        pageData: { key: docsKey },
        title: name,
      });

      const docsInfo = generateDocsInfo(docs, websitePath, {}, docsKey);
      projectDocsSitemap[docsKey] = docsInfo.sitemap;
      projectDocsHomePages.push(...docsInfo.pages.docsHomePages);
      projectDocPages.push(...docsInfo.pages.docsPages);

      readmeSitemap.push({ id: docsKey, pagePath: `/${websitePath}` });
    });

    projectDocPages.push({
      websitePath: 'readme',
      markdownPath: readmePath,
      pageData: { key: 'readme' },
      meta: { data: 'readme' },
    });

    return {
      sitemap: {
        packages: packageInfo.sitemap,
        docs: projectDocsSitemap,
        readme: readmeSitemap,
      },
      packagesMeta: packageInfo.meta,
      pages: {
        packageHomePages: packageInfo.pages.packageHomePages,
        packageDocPages: packageInfo.pages.docsPages,
        docsHomePages: [
          ...projectDocsHomePages,
          ...packageInfo.pages.docsHomePages,
        ],
        examplesHomePages: packageInfo.pages.examplesHomePages,
        examplePages: packageInfo.pages.examplesPages,
        changelogPages: packageInfo.pages.changelogPages,
        docsMainPages,
        projectDocPages,
      },
    };
  },
);
