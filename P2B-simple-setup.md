# Brisk parcel simple setup

This document explains the steps need to setup a simple Brisk project for integrating with parcel. The brisk specific code resides in the location `packages/website`.
All the config files like babel config, next config etc resides here. This simple project set up uses packages in the location `packages/website/dummy-data/simple-project` to generate the docs, examples pages etc. 
for the website. The user specific config resides in the `docs.config.js` which will be in the root of the consumer app(in this case `simple-project`). To understand more regarding the details of this file please 
visit https://hello.atlassian.net/wiki/spaces/MAKO/pages/428646164/Dev+Docs+and+Disco+Installation+of+the+website+package

To setup the project locally:
1. Run `bolt` at the root of the repository
2. Run `bolt generates` at the root. This will create all the required pages in the `/pages` folder in the website which is then used by next js to render them.
   This is just a one time setup.
3. Run `bolt parcel:dev` at the root or `yarn parcel:dev` inside `packages/website` to spin up the website in http://localhost:3000/
4. Run `bolt parcel:build` at the root or `yarn parcel:build` inside `packages/website` to build the website.

All of these commands spawns a Next process which is handled inside of `packages/website/src/bin/index.js` and then in `packages/website/src/bin/run-website.js`. Feel free to modify them
to play around with any new changes. The output is generated inside the .next folder
If you would like to clean everything and start from the beginning again do a `bolt clean` at the root and repeat the steps again.

For P2B-39
- Added index.html, client.js and entry.js(which is dynamically generated with Routes to all the pages in the website using react-router)
- The logic for this entry.js creation is in `packages/website/src/bin/generate-entry-page.js`
- Also added a webpack sample config also to check if the pages are build using the entry point.
- In the initial commit webpack build fails for loading CSS and MDXTag which is not handled in the webpack.config