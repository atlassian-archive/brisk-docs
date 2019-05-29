module.exports = () => ({
  siteName: 'Brisk Docs Docs',
  packages: ['./packages/*'],
  showSubExamples: true,
  docs: [
    {
      path: './docs',
      name: 'Docs',
      description: 'View the documents for this project',
    },
    {
      path: './guides',
      name: 'Guides',
      description: 'View the guides for this project',
    },
  ],
});
