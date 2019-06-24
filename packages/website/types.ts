/** This is metadata specified in the frontmatter of markdown pages */
export type PageMeta = {
  /** Title of the page, defaults to titlecased version of doc.id (filename) */
  title: string;
};

export interface Page {
  id: string;
  pagePath: string;
  children?: Page[];
  meta: PageMeta;
}

export interface ExamplePage extends Page {
  isolatedPath: string;
}

export type NestedExamples =
  | { id: string; children: NestedExamples[]; pagePath: string }
  | ExamplePage;

export type NestedPages = { id: string; children: NestedPages[] } | Page;

type Maintainers = string | string[];

type Repository = string | { type: string; url: string; directory?: string };

type PackageMeta = {
  id: string;
  description: string;
  version: string;
  maintainers?: Maintainers;
  repository?: Repository;
};

export declare type PackageMetadata = {
  metaData: PackageMeta[];
};

export declare type PackageInfo = {
  id: string;
  description: string;
  version: string;
  maintainers?: Maintainers;
  packageId: string;
  homePath: string;
  homeMeta: PageMeta | undefined;
  changelogPath: string;
  docs: Page[];
  examples: ExamplePage[];
  subExamples: NestedExamples[];
  repository: Repository;
  parentId?: string;
};
