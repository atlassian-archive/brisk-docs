# Goal

> Run `gatsby develop` to load a brisk site, without running a brisk command first.

## Current status

You can include the brisk plugin in your gatsby config like so:

```js
module.exports = {
  plugins: [
    {
      resolve: '@brisk-docs/gatsby-plugin',
    },
  ],
};
```

Then run `brisk build-pages && gatsby develop` to load the site.

# Why do we need this?

When you run gatsby, it finds and uses the babel config. If we put the `gatsby-config.js` in the root and run it,
then it does wrong babel things and fails to compile. This needs to be thought through.

NB: since we aren't using brisk's config, we can't pass through any of the

## Things that are still wrong/need doing

1. We won't resolve the DOCS_WEBSITE_CONFIG_PATH anymore. Replace this with require `./docs.config.js` from next to where the gatsby command is being run
2. The images, even base images such as is displayed on the homepage tiles aren't loaded. Gatsby automatically makes available images in `/static` of where it is run - we need to add something to make these images available from the plugin. Here it's being hidden by me having copied `/static` into the `test-website` folder.
3. There is a bug in gatsby that prevents it working in monorepos [can be followed here](https://github.com/gatsbyjs/gatsby/issues/19377). This is a very hard blocker for us. Workaround is to go to `/node_modules/gatsby/dist/utils/eslint-config.js` and delete or comment out line 12 after you have installed. :/
4. Documentation and code review/less hacks
5. Spar how to remove the brisk step of the above
