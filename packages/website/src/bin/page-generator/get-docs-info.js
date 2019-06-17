// Script for building info about the top level documentation for a project.
// Does not build pages at this point.

const path = require('path');
const fs = require('fs-extra');
const handleConfig = require('../handle-config');

const sortDirectory = (processedDir, dirPath) => {
  const dirConfig = handleConfig(dirPath);

  if (dirConfig && dirConfig.sortOrder) {
    processedDir.sort((a, b) => {
      const aIndex = dirConfig.sortOrder.indexOf(a.id);
      const bIndex = dirConfig.sortOrder.indexOf(b.id);
      const wildcardIndex = dirConfig.sortOrder.indexOf('*');

      const defaultSortOrder =
        wildcardIndex === -1 ? dirConfig.sortOrder.length : wildcardIndex;
      const aSortOrder = aIndex === -1 ? defaultSortOrder : aIndex;
      const bSortOrder = bIndex === -1 ? defaultSortOrder : bIndex;

      if (aSortOrder < bSortOrder) {
        return -1;
      }
      if (bSortOrder < aSortOrder) {
        return 1;
      }

      return a.id.localeCompare(b.id);
    });
  }
};

const processDirectory = dirPath => {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return null;
  }

  const processedDir = fs
    .readdirSync(dirPath)
    .filter(file => !file.startsWith('_'))
    .map(fname => ({
      id: path.parse(fname).name,
      fullPath: path.resolve(dirPath, fname),
    }))
    .map(({ id, fullPath }) => {
      if (fs.statSync(fullPath).isFile()) {
        if (
          path.extname(fullPath) !== '.md' &&
          path.extname(fullPath) !== '.mdx'
        ) {
          return null;
        }

        return {
          id,
          path: fullPath,
        };
      }

      return {
        id,
        children: processDirectory(fullPath),
      };
    })
    .filter(x => x);

  sortDirectory(processedDir, dirPath);

  return processedDir;
};

/**
 * @param docsPath absolute path to where the docs are located
 * @returns Nested structure representing the docs in the project
 * Filter the nested structure with empty children
 */
module.exports = function getDocsInfo(docsPath) {
  const processDocs = processDirectory(docsPath);
  return (
    processDocs && processDocs.filter(x => !x.children || x.children.length > 0)
  );
};
