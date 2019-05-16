// This is used to parse and load the images inside the mdx files when its specified as string eg: ![Remote state](./assets/remote-state.png)
// We are traversing the root first to add the import statements for images at the beginning of the file and
// Then the image nodes to convert them into the img html with the correct src.
const visit = require('unist-util-visit');

// val is used as unique number for image import variables.
let val = 0;
module.exports = () => tree =>
  visit(tree, 'root', rNode => {
    visit(tree, 'image', node => {
      const text = node.url ? node.url.trim() : '';

      // To avoid duplicate imports of same image used multiple times in an mdx file
      const existingImport = rNode.children
        .filter(x => x.type === 'import')
        .find(y => y.value.includes(text));
      const existingImg =
        existingImport &&
        existingImport.value.match(/(?<=import\s).*(?=\sfrom)/g);

      // To give a unique variable names for each import statements
      const img = existingImg ? existingImg[0] : `img${val}`;
      const statement = `import ${img} from '${text}';`;

      /* eslint-disable no-param-reassign */
      node.type = 'html';
      node.value = `<img src={${img}} alt='${node.alt}' />`;

      delete node.url;
      delete node.alt;
      /* eslint-enable */

      if (!existingImport) {
        const item = {
          type: 'import',
          value: statement,
          position: {
            start: { line: 2, column: 1, offset: 1 },
            end: {
              line: 2,
              column: statement.length,
              offset: statement.length,
            },
            indent: [],
          },
        };
        rNode.children.splice(0, 0, item);
        val += 1;
      }
    });
  });
