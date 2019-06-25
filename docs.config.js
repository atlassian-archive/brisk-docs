const docs = [
  {
    path: './docs',
    name: 'Docs',
    description:
      'Information about brisk as a whole, and contributing to brisk',
  },
];

if (process.env && process.env.HEAD === 'production') {
  docs.push({
    path: './example-pages',
    name: 'Example Pages',
    description: 'This is a collection of example pages for how pages ',
  });
}

module.exports = () => ({
  siteName: 'Brisk Docs Docs',
  packages: ['./packages/*'],
  showSubExamples: true,
  docs,
});
