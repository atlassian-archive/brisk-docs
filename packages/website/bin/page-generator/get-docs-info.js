// Script for building info about the top level documentation for a project.
// Does not build pages at this point.

const path = require('path');
const fs = require('fs-extra');

const processDirectory = dirPath => {
  console.log(dirPath);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return null;
  }

  return fs
    .readdirSync(dirPath)
    .map(fname => ({
      id: path.parse(fname).name,
      fullPath: path.resolve(dirPath, fname),
    }))
    .map(({ id, fullPath }) => {
      if (fs.statSync(fullPath).isFile()) {
        return {
          id,
          path: fullPath,
        };
      }

      return {
        id,
        children: processDirectory(fullPath),
      };
    });
};

/**
 * @param docsPath absolute path to where the docs are located
 * @returns Nested structure representing the docs in the project
 */
module.exports = function getDocsInfo(docsPath) {
  return processDirectory(docsPath);
};
