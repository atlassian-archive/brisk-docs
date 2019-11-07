require('dotenv').config()

const docs = [
  {
    path: './docs',
    name: 'Docs',
    description:
      'Information about brisk as a whole, and contributing to brisk',
  },
];

const links = [];

if (process.env && process.env.CONTEXT !== 'production') {
  docs.push({
    path: './example-pages',
    name: 'Example Pages',
    description: 'This is a collection of example pages.',
  });

  links.push({
    href: '/example-pages/guide-1',
    label: 'Example guide 1',
    description: 'This is an example arbitrary internal link.',
  });
  links.push({
    href: 'https://atlaskit.atlassian.com',
    label: 'Atlaskit',
    description: 'This is an example arbitrary external link.',
  });
}

module.exports = () => ({
  siteName: 'Brisk Docs Docs',
  packages: ['./packages/*'],
  showSubExamples: false,
  docs,
  links,
});
