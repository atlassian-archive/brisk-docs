import path from 'path';

import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import getConfiguration from './stages/get-configuration/handle-config';

const devPipeline = (configPath?: string) => {
  const cwd = process.cwd();
  const config = getConfiguration(cwd, configPath);

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
        ...config
      }),
    )
    .then(() => {
      console.log('Thanks for documenting with brisk-docs! 🎿');
    });
};

export default devPipeline;
