import path from 'path';
import runWebsite from './stages/run-website';
import allPaths from './getAllPaths';

const exportSeverPipeline = (nextOptions: string[], configPath?: string) => {
  const { rootPath, pkgRoot } = allPaths(configPath);
  nextOptions.push(`-o ${path.join(rootPath, 'out')}`);
  return runWebsite({
    command: 'export',
    configPath,
    pkgRoot,
    rootPath,
    nextOptions,
  });
};

export default exportSeverPipeline;
