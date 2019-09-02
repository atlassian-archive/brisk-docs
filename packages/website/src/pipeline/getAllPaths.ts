import path from 'path';
import getConfiguration from './stages/get-configuration/handle-config';

export default (configPath?: string) => {
  const cwd = process.cwd();
  const config = getConfiguration(cwd, configPath);

  // TODO: Use less flakey way to get these paths
  const pkgRoot = path.resolve(__dirname, '..', '..');
  const wrappersPath = path.resolve(pkgRoot, `./src/components/page-templates`);
  const pagesPath = path.resolve(pkgRoot, `./pages`);

  return {
    rootPath: cwd,
    wrappersPath,
    pagesPath,
    pkgRoot,
    config,
  };
};
