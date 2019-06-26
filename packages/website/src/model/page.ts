import titleCase from 'title-case';
import { DocsPage, Page } from '../../types';
/* eslint-disable import/prefer-default-export */
/**
 * Business logic related to pages
 * @file page.ts
 */

/**
 * Whether the page is a docs page. Currently just used as a typeguard so that we can access
 * meta when it does not exist on all types of pages.
 */
const isDocsPage = (page: any): page is DocsPage => {
  return page.meta != null;
};

/**
 * Retrieve the title of a page. This is either the page's custom title
 * set via the meta.title attribute or by default, the title cased version of the page id.
 */
export const getTitle = (page: Page) => {
  return (isDocsPage(page) && page.meta.title) || titleCase(page.id);
};
