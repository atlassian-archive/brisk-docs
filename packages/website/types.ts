export interface Page {
  id: string;
  pagePath: string;
  children: undefined;
}

export interface ExamplePage extends Page {
  isolatedPath: string;
}

export type NestedExamples =
  | { id: string; children: NestedExamples[] }
  | ExamplePage;

export type NestedPages = { id: string; children: NestedPages[] } | Page;

export type Pages = Page[];

type Maintainers = string | string[];

type Repository = string | { type: string; url: string; directory?: string };

type Meta = {
  id: string;
  description: string;
  version: string;
  maintainers?: Maintainers;
  repository?: Repository;
};

export declare type Metadata = {
  metaData: Meta[];
};

export declare type PackageInfo = {
  id: string;
  description: string;
  version: string;
  maintainers?: Maintainers;
  packageId: string;
  homePath: string;
  changelogPath: string;
  docs: Pages;
  examples: ExamplePage[];
  subExamples: NestedExamples[];
  repository: Repository;
};
