import fs from 'fs-extra';
import path from 'path';

import createStage from '../make-pipeline-stage';
import getAppPage from './_app-template';

const { writeFile } = require('../generate-pages/page-writers');

// Boilerplate, uncomment when used
// interface StageConfig {}
interface StageInput {
  pagesPath: string;
  pkgRoot: string;
}
interface StageOutput {}

const flattenDir = async (dirPath: string): Promise<Array<string>> => {
  let allPages: Array<string> = [];
  const possiblePages = await fs.readdir(dirPath);

  while (possiblePages.length > 0) {
    const currentPage = possiblePages.shift() || '';
    const currentPath = path.join(dirPath, currentPage);

    if (fs.lstatSync(currentPath).isDirectory()) {
      // eslint-disable-next-line no-await-in-loop
      const newPages = await flattenDir(currentPath);
      allPages = [...allPages, ...newPages];
    } else {
      allPages.push(currentPath);
    }
  }
  return allPages;
};

export default createStage(
  'build-website',
  async ( { pagesPath, pkgRoot }: StageInput): Promise<StageOutput> => {
    const allPages = await flattenDir(pagesPath);
    const app = getAppPage(allPages.map(page => page.replace(pagesPath, '')));
    writeFile(path.join(pkgRoot, '_app.js'), app);
    return app;
  },
);
