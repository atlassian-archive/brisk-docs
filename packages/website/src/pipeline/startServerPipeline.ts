import runGatsby from './stages/run-gatsby';
import allPaths from './getAllPaths';

const startSeverPipeline = async (
  configPath?: string,
  gatsbyOptions?: string[],
) => {
  const { rootPath, pkgRoot } = await allPaths(configPath);

  runGatsby({
    command: 'develop',
    configPath,
    pkgRoot,
    rootPath,
    gatsbyOptions,
  });
};

export default startSeverPipeline;
