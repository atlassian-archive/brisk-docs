import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import buildWebsite from './stages/build-website';
import allPaths from './getAllPaths';

// TODO: build pipeline will have a build step and no run step
const buildPipeline = async (configPath?: string, nextOptions?: string[]) => {
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
      buildWebsite({
        command: 'build',
        configPath,
        pkgRoot,
        rootPath,
        nextOptions,
      }),
    )
    .then(() => {
      console.log('Build with brisk-docs success! 🎿');
    });
};

export default buildPipeline;
