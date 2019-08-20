import {
  devPipeline,
  buildPipeline,
  startServerPipeline,
  exportServerPipeline,
} from './pipeline';

// @ts-ignore: Importing non-ts file with no definition
const commandLineArgs = require('command-line-args');

const mainDefinitions = [{ name: 'command', defaultOption: true }];
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
});

// We have no control over this dangling underscore
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

const handleError = (err: any) => {
  console.error(err);
  process.exit(1);
};

const cliOptions = [
  { name: 'config', type: String },
  { name: 'port', alias: 'p', type: Number },
  { name: 'debug', alias: 'd', type: Boolean },
];
const options = commandLineArgs(cliOptions, { argv, camelCase: true });

// TODO: Do this only if the server is Next Js. Do the check for parcel/next here in future
const nextOptions: string[] = [];

if (options.port) nextOptions.push(`--port ${options.port}`);

if (options.debugNext) nextOptions.push('debug-next');

const runBinary = () => {
  switch (mainOptions.command) {
    case 'dev': {
      return devPipeline(options.config, nextOptions).catch(handleError);
    }
    case 'build': {
      return buildPipeline(options.config, nextOptions).catch(handleError);
    }
    case 'start': {
      return startServerPipeline(options.config, nextOptions).catch(
        handleError,
      );
    }
    // case 'start': {
    //   throw new Error('not implemented');
    //   //   break;
    // }
    case 'export': {
      return exportServerPipeline(nextOptions, options.config).catch(
        handleError,
      );
    }
    default:
      throw new Error(`Cannot run unknown command, ${mainOptions.command}`);
  }
};

export default runBinary;
