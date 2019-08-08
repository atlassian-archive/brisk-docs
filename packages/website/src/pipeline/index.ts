import path from 'path';

import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import buildWebsite from './stages/build-website';
import runWebsite from './stages/run-website';
import getConfiguration from './stages/get-configuration/handle-config';

export default () => {
  const cwd = process.cwd();
  const config = getConfiguration(cwd);

  // TODO: Use less flakey way to get these paths
  const pkgRoot = path.resolve(__dirname, '..', '..');
  const wrappersPath = path.resolve(pkgRoot, `./src/components/page-templates`);
  const pagesPath = path.resolve(pkgRoot, `./pages`);

  return scanMetadata({
    rootPath: cwd,
    packagePathPatterns: config.packagesPaths,
    customPackageFields: config.customPackageFields,
    docs: config.docs,
  })
    .then(projectData => generateWebsiteInfo(projectData))
    .then(websiteInfo =>
      generatePages({
        wrappersPath,
        pagesPath,
        ...websiteInfo.pages,
      }),
    )
    .then(() => buildWebsite({}))
    .then(result => runWebsite({ port: '3001', staticRoot: pkgRoot }));
  // .then(() => {
  //   console.log('Thanks for documenting with brisk-docs! 🎿');
  // });
};
