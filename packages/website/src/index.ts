import commandLineArgs from 'command-line-args';
import {
  devPipeline,
  generatePagesPipeline,
  startServerPipeline,
} from './pipeline';

const mainDefinitions = [{ name: 'command', defaultOption: true }];
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
});

// We have no control over this dangling underscore
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

const handleError = err => {
  console.error(err);
  process.exit(1);
};

const cliOptions = [
  { name: 'config', type: String },
  { name: 'port', alias: 'p', type: Number },
  { name: 'debug', alias: 'd', type: Boolean },
];
const options = commandLineArgs(cliOptions, { argv, camelCase: true });

const runBinary = () => {
  switch (mainOptions.command) {
    case 'dev': {
      return devPipeline(options.config, options.port).catch(handleError);
    }
    case 'build': {
      throw new Error('not implemented');
      //   break;
    }
    case 'start': {
      throw new Error('not implemented');
      //   break;
    }
    case 'start-server': {
      return startServerPipeline(options.port).catch(handleError);
    }
    case 'generate': {
      return generatePagesPipeline(options.config).catch(handleError);
    }
    case 'export': {
      throw new Error('not implemented');
      //   break;
    }
    default:
      throw new Error(`Cannot run unknown command, ${mainOptions.command}`);
  }
};

export default runBinary;
