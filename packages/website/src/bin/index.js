#!/usr/bin/env node
const commandLineArgs = require('command-line-args');

const { dev, build, start, exportWebsite } = require('./run-website');

const mainDefinitions = [{ name: 'command', defaultOption: true }];
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
});

// We have no control over this dangling underscore
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

const cliOptions = [{ name: 'config', type: String }];
const options = commandLineArgs(cliOptions, { argv, camelCase: true });

if (mainOptions.command === undefined) {
  throw new Error(`No command supplied`);
}

const handleError = err => {
  console.error(err);
  process.exit(1);
};

switch (mainOptions.command) {
  case 'dev': {
    dev(options.config).catch(handleError);
    break;
  }
  case 'build': {
    build(options.config).catch(handleError);
    break;
  }
  case 'start': {
    start(options.config).catch(handleError);
    break;
  }
  case 'export': {
    exportWebsite(options.config).catch(handleError);
    break;
  }
  default:
    throw new Error(`Cannot run unknown command, ${mainOptions.command}`);
}
