import path from 'path';

import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import buildWebsite from './stages/build-website';
import runWebsite from './stages/run-website';
import getConfiguration from './stages/get-configuration/handle-config';

const devPipeline = (configPath?: string, maybePort?: string) => {
  const cwd = process.cwd();
  const config = getConfiguration(cwd, configPath);
  const port = maybePort || '3001';

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
        packageRoot: pkgRoot,
        ...websiteInfo,
        ...config,
      }),
    )
    .then(() => buildWebsite({ pagesPath, pkgRoot })) // TODO: this step is specific only for parcel now. Need to modify based on ENV variable maybe
    .then(result => runWebsite({ port, staticRoot: pkgRoot }));
  // .then(() => {
  //   console.log('Thanks for documenting with brisk-docs! 🎿');
  // });
};

export default devPipeline;
