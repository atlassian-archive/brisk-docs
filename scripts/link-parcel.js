const fs = require('fs-extra');
const path = require('path');

async function linkParcel() {
  const parcelHome = process.argv[2];

  if (!parcelHome) {
    console.warn('no parcel home provided');
    return;
  }
  const nodeModulesParcel = path.resolve(__dirname, '../node_modules/@parcel');

  try {
    await fs.remove(nodeModulesParcel);
    await fs.ensureSymlink(
      path.resolve(parcelHome, 'node_modules/@parcel'),
      nodeModulesParcel,
    );
  } catch (e) {
    console.error(e);
  }

  console.log(
    'symlink to parcel should have been successful. Good luck deving!',
  );
}

linkParcel();
