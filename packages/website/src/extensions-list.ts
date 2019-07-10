/* extensions-list.json is only generated upon building the website, and so will not exist
   during linting. This file exists so there is a single place where extensions-list.json is
   imported so the eslint rule only needs to be disabled here, as opposed to every file
   pages-list.json is used.
*/

// @ts-ignore
import extensions from '../data/extensions-list';

export default extensions;
