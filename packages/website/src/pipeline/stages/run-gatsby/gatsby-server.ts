import { spawnSync } from 'child_process';

export default async function spawnGatsbyProcess({
  command,
  configPath,
  pkgRoot,
  rootPath,
  gatsbyOptions = [],
}: {
  command: string;
  configPath?: string;
  pkgRoot: string;
  rootPath: string;
  gatsbyOptions?: string[];
}) {
  const envVariables: {
    FORCE_EXTRACT_REACT_TYPES: boolean;
    DOCS_WEBSITE_CWD: string;
    DOCS_WEBSITE_CONFIG_PATH?: string;
  } = {
    FORCE_EXTRACT_REACT_TYPES: true,
    DOCS_WEBSITE_CWD: rootPath,
  };
  if (configPath) {
    envVariables.DOCS_WEBSITE_CONFIG_PATH = configPath;
  }

  const nodeEnv = 'PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src';
  const gatsbyBin = 'gatsby';

  const { status } = spawnSync(
    `${nodeEnv} ${gatsbyBin} ${command} ${gatsbyOptions.join(' ')}`,
    [],
    // @ts-ignore
    {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        ...envVariables,
      },
      cwd: '/Users/bconolly/Development/brisk-docs/packages/test-website',
    },
  );

  if (status !== 0) {
    throw new Error(`Gatsby ${command} failed with exit code ${status}`);
  }
}
