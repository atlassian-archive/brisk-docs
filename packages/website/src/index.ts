import {
  devPipeline,
  buildPipeline,
  startServerPipeline,
  exportServerPipeline,
  buildPagesPipeline,
} from './pipeline';

// @ts-ignore
import getCommandLineOptions from './get-command-line-options';

const handleError = (err: any) => {
  console.error(err);
  process.exit(1);
};

const { command, options, nextOptions } = getCommandLineOptions();

const runBinary = () => {
  switch (command) {
    case 'dev': {
      return devPipeline(options.config, nextOptions).catch(handleError);
    }
    case 'build-pages': {
      return buildPagesPipeline(options.config).catch(handleError);
    }
    case 'build': {
      return buildPipeline(options.config, nextOptions).catch(handleError);
    }
    case 'start': {
      return startServerPipeline(options.config, nextOptions).catch(
        handleError,
      );
    }
    case 'export': {
      return exportServerPipeline(nextOptions, options.config).catch(
        handleError,
      );
    }
    default:
      throw new Error(`Cannot run unknown command, ${command}`);
  }
};

export default runBinary;
