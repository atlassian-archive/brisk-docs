export type Page = {
  id: string;
  pagePath: string;
};

export type Pages = Array<Page>;

export declare type PackageInfo = {
  id: string;
  description: string;
  version: string;
  maintainers?: string;
};
