import { createContext } from 'react';

export type PageStatus = {
  /** Whether the page has been converted from a non-index file such as a README into an index page.
   * This affects how relative directory paths in markdown is transformed into a link on the website.
   */
  convertedToDir: false;
};

export const PageStatusContext = createContext<PageStatus>({
  convertedToDir: false,
});
