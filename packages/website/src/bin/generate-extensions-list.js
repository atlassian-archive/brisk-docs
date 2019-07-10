/**
 * generateExtensionsList - generates source code for an extensions-list.js file
 *
 * @param {string[]}} extensions
 *
 * @returns {string} generated source code
 */
module.exports = extensions => `
${extensions
  .map((extension, i) => `import extension_${i} from '${extension}'`)
  .join('\n')}


module.exports = [${extensions
  .map((extension, i) => `extension_${i}`)
  .join(', ')}];
`;
