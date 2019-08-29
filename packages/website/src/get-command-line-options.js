const commandLineArgs = require('command-line-args');

module.exports = function getCommandLineOptions() {
  const mainDefinitions = [{ name: 'command', defaultOption: true }];
  const mainOptions = commandLineArgs(mainDefinitions, {
    stopAtFirstUnknown: true,
  });

  // We have no control over this dangling underscore
  // eslint-disable-next-line no-underscore-dangle
  const argv = mainOptions._unknown || [];

  const cliOptions = [
    { name: 'config', type: String },
    { name: 'port', alias: 'p', type: Number },
    { name: 'debug', alias: 'd', type: Boolean },
  ];
  const options = commandLineArgs(cliOptions, { argv, camelCase: true });

  // TODO: Do this only if the server is Next Js. Do the check for parcel/next here in future
  const nextOptions = [];

  if (options.port) nextOptions.push(`--port ${options.port}`);

  if (options.debugNext) nextOptions.push('debug-next');

  return { command: mainOptions.command, options, nextOptions };
};
