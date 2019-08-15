const fs = require('fs-extra');
const path = require('path');

function linkParcel() {
  const parcelHome = process.argv[2];

  if (!parcelHome) {
    console.warn('no parcel home provided');
    return;
  }

  const parcelCore = path.resolve(parcelHome, 'packages', 'core', 'core');
  const parcelConfig = path.resolve(
    parcelHome,
    'packages',
    'configs',
    'default',
  );
  const nodeCore = path.resolve(
    process.cwd(),
    'node_modules',
    '@parcel',
    'core',
  );
  const nodeConfig = path.resolve(
    process.cwd(),
    'node_modules',
    '@parcel',
    'config-default',
  );

  Promise.all([
    fs.ensureSymlink(parcelCore, nodeCore),
    fs.ensureSymlink(parcelConfig, nodeConfig),
  ])
    .then(() => {
      console.log(
        'symlink to parcel should have been successful. Good luck deving!',
      );
    })
    .catch(e => console.error(e));
}

linkParcel();
