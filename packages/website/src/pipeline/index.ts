import scanMetadata from './stages/scan-metadata';
import generateWebsiteInfo from './stages/generate-website-info';
import generatePages from './stages/generate-pages';
import buildWebsite from './stages/build-website';
import runWebsite from './stages/run-website';

export default () => {
  return scanMetadata({
    rootPath: '',
    packagePathPatterns: [],
    customPackageFields: [],
    docs: [],
  })
    .then(projectData => generateWebsiteInfo(projectData))
    .then(websiteInfo =>
      generatePages({
        wrappersPath: '',
        pagesPath: '',
        ...websiteInfo.pages,
      }),
    )
    .then(() => buildWebsite({}))
    .then(result => runWebsite(result))
    .then(() => {
      console.log('Thanks for documenting with brisk-docs! 🎿');
    });
};
