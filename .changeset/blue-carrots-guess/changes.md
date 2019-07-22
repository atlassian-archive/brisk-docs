Replaced globs with jobsite for discovering packages. 
This will need the packages in the docs.config.js be same as the workspaces path specified in the package.json(non relative paths). 
Also added another key rootDir in the docs.config.json, if the packages root is different from location where brisk is installed and running(eg: Jira)