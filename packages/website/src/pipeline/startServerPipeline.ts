import runWebsite from './stages/run-website';
import allPaths from './getAllPaths';

const startSeverPipeline = (configPath?: string, nextOptions?: string[]) => {
  const { rootPath, pkgRoot } = allPaths(configPath);

  return runWebsite({
    command: 'start',
    configPath,
    pkgRoot,
    rootPath,
    nextOptions,
  });
};

export default startSeverPipeline;
