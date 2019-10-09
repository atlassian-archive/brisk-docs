const { createContentDigest } = require(`gatsby-core-utils`);

const data = require('../../data/packages-data.json');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type packageInfo implements Node {
        name: String
        version: String
        packageRootPath: String
        id: String
      }
    `;
  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const contentDigest = createContentDigest({
    stats: {},
  });

  data.metaData.forEach(datum => {
    createNode({
      name: datum.name,
      version: datum.version,
      packageRootPath: datum.packageRootPath,
      id: datum.id,
      internal: { contentDigest, type: 'packageInfo' },
    });
  });
};

exports.createPages(({ actions }) => {});
