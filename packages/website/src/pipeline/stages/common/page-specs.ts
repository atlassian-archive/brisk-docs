// Collection of shared interfaces for specifying pages to generate

export interface GenericPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // Additional data used by the page
  pageData: object;
  // Window title for this page
  title?: string;
}

export interface DocPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // An absolute path to the location of the user generated markdown content
  markdownPath: string;
  // Additional data used by the page
  pageData: object;
  // Metadata about the page
  meta: object;
}

export interface ExamplePage {
  // The path the example page should appear at in the finished website
  websitePath: string;
  // The path the fullscreen example page should appear at in the finished website
  fullscreenExampleWebsitePath: string;
  // An absolute path to the location of the user generated example
  exampleModulePath: string;
  // Additional data used by the page
  pageData: object;
  // Window title for this page
  title?: string;
}

export interface ChangelogPage {
  // The path this page should appear at in the finished website
  websitePath: string;
  // An absolute path to the location of the user generated changelogs
  changelogPath?: string;
  // Additional data used by the page
  pageData: object;
  // Window title for this page
  title?: string;
}