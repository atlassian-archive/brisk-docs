/* pages-list.json is only generated upon building the website, and so will not exist
   during linting. This file exists so there is a single place where pages-list.json is
   imported so the eslint rule only needs to be disabled here, as opposed to every file
   pages-list.json is used.
*/

// @ts-ignore
import pageInfo from './data/pages-list.json';
import { Page, PackageInfo } from './types';

interface Info {
  packages: PackageInfo[];
  docs: Page[];
}

const data: Info = pageInfo;

export default data;
