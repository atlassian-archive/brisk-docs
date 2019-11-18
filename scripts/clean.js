const getWorkspaces = require('get-workspaces').default;
const rimraf = require('rimraf');
const path = require('path');

const rimrafPromise = dirPath =>
  new Promise((resolve, reject) => {
    rimraf(dirPath, err => {
      if (err) reject(err);
      resolve();
    });
  });

async function repeatedAction() {
  const workspaces = await getWorkspaces({
    cwd: process.cwd(),
    tools: ['yarn'],
  });

  await Promise.all(
    workspaces.map(({ dir }) =>
      Promise.all([
        rimrafPromise(path.join(dir, 'dist')),
        rimrafPromise(path.join(dir, 'node_modules')),
      ]),
    ),
  );
  console.log('removed all dists and node_modules');
}

repeatedAction();
