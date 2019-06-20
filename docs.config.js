module.exports = () => ({
  siteName: 'Brisk Docs Docs',
  packages: ['./packages/*'],
  showSubExamples: true,
  docs: [
    {
      path: './docs',
      name: 'Docs',
      description:
        'Information about brisk as a whole, and contributing to brisk',
    },
    {
      path: './test-pages',
      name: 'Test Pages',
      description:
        "This is a collection of test pages used by brisk devs - you probably won't find anything useful in here",
    },
  ],
});
