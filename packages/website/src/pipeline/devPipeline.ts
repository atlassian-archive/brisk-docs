import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import runWebsite from './stages/run-website';
import allPaths from './getAllPaths';

const devPipeline = async (configPath?: string, nextOptions?: string[]) => {
  const { rootPath, wrappersPath, pagesPath, pkgRoot, config } = await allPaths(
    configPath,
  );

  return scanMetadata({
    rootPath,
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
    .then(() =>
      runWebsite({
        command: 'dev',
        configPath,
        pkgRoot,
        rootPath,
        nextOptions,
      }),
    );
};

export default devPipeline;
