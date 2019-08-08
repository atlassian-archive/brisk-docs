import path from 'path';

import runWebsite from './stages/run-website';

const startSeverPipeline = (maybePort?: string) => {
  const port = maybePort || '3001';

  // TODO: Use less flakey way to get these paths
  const pkgRoot = path.resolve(__dirname, '..', '..');

  return runWebsite({ port, staticRoot: pkgRoot });
};

export default startSeverPipeline;
