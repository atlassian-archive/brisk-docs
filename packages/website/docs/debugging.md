# Debugging

There are two primary ways of debugging brisk, debugging the pre-next page generation phase and debugging next itself.

It is only possible to debug one at a time since brisk spawns a next process and trying to inspect both will result in EADDRUSE errors for the inspect port.

## Page generation

To debug the page generation phase, run `yarn debug:generation` in the website package directory.

This command simply runs the relevant brisk command using the node executable and the built-in `--inspect-brk` flag.

An example vscode `launch.json` using the `yarn debug:generate` command

```json
{
      "name": "Brisk - generate",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "yarn",
      "cwd": "${workspaceFolder}/packages/website",
      "runtimeArgs": ["debug:generate"],
      "port": 9229,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
},
```

You can also run this manually a couple of ways:

1. Running the bin directly:

`brisk/packages/website $ node --inspect-brk src/bin/index.js dev --config=dummy-data/simple-project/docs.config.js`

2. Running via the yarn executable:

`brisk $ node --inspect-brk $(yarn bin brisk) dev`

## Next

To debug next's compilation and server-side render phase, run the `yarn debug:next` command in the website directory or append the `--debug-next` flag to any `brisk` command.

E.g.

`yarn debug:next`

`yarn build:site --debug-next`

Example launch.json:

```json
{
      "name": "Brisk - next",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "yarn",
      "cwd": "${workspaceFolder}/packages/website",
      "runtimeArgs": ["debug:next"],
      "port": 9229,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
},
```
