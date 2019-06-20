const { spawnSync } = require('child_process');
const path = require('path');

const handleConfig = require('./handle-config');
const generatePages = require('./generate-pages');

const cwd = process.cwd();
const nextRoot = path.resolve(__dirname, '..', '..');

const spawnNextProcess = (command, websiteConfigPath, ...args) => {
  const envVariables = {
    FORCE_EXTRACT_REACT_TYPES: true,
    DOCS_WEBSITE_CWD: cwd,
  };
  if (websiteConfigPath) {
    envVariables.DOCS_WEBSITE_CONFIG_PATH = websiteConfigPath;
  }

  let nodeEnv = 'PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src';

  const filteredArgs = args.filter(arg => arg !== 'debug');
  if (args.length !== filteredArgs.length) {
    nodeEnv += ' NODE_OPTIONS="--inspect-brk"';
  }

  const { status } = spawnSync(
    `${nodeEnv} next ${command} ${filteredArgs.join(' ')}`,
    [],
    {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        ...envVariables,
      },
      cwd: nextRoot,
    },
  );

  if (status !== 0) {
    throw new Error(`Next ${command} failed with exit code ${status}`);
  }
};

const preNextScripts = async configPath => {
  const config = handleConfig(cwd, configPath);
  await generatePages(config);
};

const dev = async (configPath, nextOptions = []) => {
  await preNextScripts(configPath);
  spawnNextProcess('dev', configPath, ...nextOptions);
};

const build = async (configPath, nextOptions = []) => {
  await preNextScripts(configPath);
  spawnNextProcess('build', configPath, ...nextOptions);
};

const start = async (configPath, nextOptions = []) => {
  spawnNextProcess('start', configPath, ...nextOptions);
};

const exportWebsite = async (configPath, nextOptions = []) => {
  spawnNextProcess(
    'export',
    configPath,
    `-o ${path.join(cwd, 'out')}`,
    ...nextOptions,
  );
};

module.exports.dev = dev;
module.exports.build = build;
module.exports.start = start;
module.exports.exportWebsite = exportWebsite;
