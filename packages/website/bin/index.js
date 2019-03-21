#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const commandLineArgs = require('command-line-args');

const generatePages = require('./generate-pages');
const handleConfig = require('./handle-config');

const mainDefinitions = [{ name: 'command', defaultOption: true }];
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
});

const nextRoot = path.resolve(__dirname, '..');

// We have no control over this dangling underscore
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

const cliOptions = [{ name: 'config', type: String }];
const options = commandLineArgs(cliOptions, { argv, camelCase: true });
const cwd = process.cwd();

const spawnNextProcess = command => {
  spawnSync(
    `PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src next ${command}`,
    [],
    {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_EXTRACT_REACT_TYPES: true },
      cwd: nextRoot,
    },
  );
};

const preNextScripts = async () => {
  const config = handleConfig(cwd, options.config);
  await generatePages(config);
};

switch (mainOptions.command) {
  case 'dev': {
    preNextScripts().then(() => spawnNextProcess('dev'));
    break;
  }
  case 'build': {
    preNextScripts().then(() => spawnNextProcess('build'));
    break;
  }
  case 'start': {
    spawnNextProcess('start');
    break;
  }
  default:
    throw new Error(`Cannot run unknown command, ${mainOptions.command}`);
}
