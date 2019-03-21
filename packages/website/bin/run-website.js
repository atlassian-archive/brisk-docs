const { spawnSync } = require('child_process');
const path = require('path');

const handleConfig = require('./handle-config');
const generatePages = require('./generate-pages');

const cwd = process.cwd();
const nextRoot = path.resolve(__dirname, '..');

const spawnNextProcess = (command, websiteConfigPath, args = '') => {
  const { status } = spawnSync(
    `PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src next ${command} ${args}`,
    [],
    {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        FORCE_EXTRACT_REACT_TYPES: true,
        DOCS_WEBSITE_CONFIG_PATH: websiteConfigPath,
        DOCS_WEBSITE_CWD: cwd,
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

const dev = async configPath => {
  await preNextScripts(configPath);
  spawnNextProcess('dev', configPath);
};

const build = async configPath => {
  await preNextScripts(configPath);
  spawnNextProcess('build', configPath);
};

const start = async configPath => {
  spawnNextProcess('start', configPath, '-p 8080');
};

module.exports.dev = dev;
module.exports.build = build;
module.exports.start = start;
