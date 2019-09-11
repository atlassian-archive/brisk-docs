import { spawnSync } from 'child_process';

export default async function spawnNextProcess({
  command,
  configPath,
  pkgRoot,
  rootPath,
  nextOptions,
}) {
  const envVariables = {
    FORCE_EXTRACT_REACT_TYPES: true,
    DOCS_WEBSITE_CWD: rootPath,
  };
  if (configPath) {
    envVariables.DOCS_WEBSITE_CONFIG_PATH = configPath;
  }

  const nodeEnv = 'PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src';
  let nextBin = 'next';

  const filteredArgs = nextOptions.filter(arg => arg !== 'debug-next');
  if (nextOptions.length !== filteredArgs.length) {
    nextBin = `node --inspect-brk $(${nodeEnv} which next)`;
  }

  const { status } = spawnSync(
    `${nodeEnv} ${nextBin} ${command} ${filteredArgs.join(' ')}`,
    [],
    {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        ...envVariables,
      },
      cwd: pkgRoot,
    },
  );

  if (status !== 0) {
    throw new Error(`Next ${command} failed with exit code ${status}`);
  }
}
