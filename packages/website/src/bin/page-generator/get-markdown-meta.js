const fs = require('fs');
const unified = require('unified');
const parseMarkdown = require('remark-parse');
const frontmatter = require('remark-frontmatter');
const yaml = require('js-yaml');

/**
 * Retrieves metadata frontmatter from a markdown file
 * @param markdownPath path to markdown file
 * @return object
 */
const getMarkdownMeta = markdownPath => {
  const tree = unified()
    .use(parseMarkdown)
    .use(frontmatter, ['yaml'])
    .parse(fs.readFileSync(markdownPath, 'utf8'));

  const frontMatterNode = tree.children[0];
  if (!frontMatterNode || frontMatterNode.type !== 'yaml') {
    return {};
  }

  let meta;

  try {
    meta = yaml.safeLoad(frontMatterNode.value);
  } catch (e) {
    if (e.name === 'YAMLException') {
      throw new Error(`Error parsing frontmatter.\n${e}`);
    }
    throw e;
  }

  return meta;
};

module.exports = getMarkdownMeta;
