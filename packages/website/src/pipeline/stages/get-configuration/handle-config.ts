import path from 'path';

import fse from 'fs-extra';
import {
  BriskConfiguration,
  ProjectDocsConfig,
  UserConfig,
} from '../common/configuration-options';

import defaultConfig from './default-config';

/**
 * Validates a config entry specifying a path or paths and normalises
 * it into an array of paths
 * @param entry the value of an config param
 * @returns {Array} a list of paths
 * @throws an error if the config is in an invalid format
 */
const resolvePathsConfig = (entry: any): string[] => {
  if (typeof entry === 'string') {
    return [entry];
  }

  if (Array.isArray(entry)) {
    return entry;
  }

  throw new Error('entry must be an array or a string');
};

type PartialConfig = { [P in keyof UserConfig]?: UserConfig[P] };

const processConfig = (
  cwd: string,
  providedConfig: PartialConfig,
): BriskConfiguration => {
  const config = { ...defaultConfig, ...providedConfig };
  const {
    docs,
    packages,
    customPackageFields,
    templates = [],
    gatsbyNode = {},
    ...rest
  } = config;

  const docsConfig = Array.isArray(docs) ? docs : [docs];
  const docsList: ProjectDocsConfig[] = docsConfig.map(doc => {
    const { name, path: docPath, urlPath, imgSrc, description } = doc;

    if (!name) throw new Error('name must be provided for all the docs items');
    if (!docPath) {
      throw new Error('path must be provided for all the docs items');
    }
    const docsPath = path.resolve(cwd, docPath);

    return {
      name,
      path: docsPath,
      urlPath: urlPath || docPath,
      imgSrc,
      description,
    };
  });

  const readmePath = path.resolve(cwd, 'README.md');
  const packagesConfig = resolvePathsConfig(packages);
  const packagesPaths = packagesConfig.map(packagesPath =>
    path.resolve(cwd, packagesPath),
  );

  const acceptedTemplates = ['package:home'];

  const errors = templates
    .map(({ page }) => {
      if (!acceptedTemplates.includes(page)) {
        // eslint-disable-next-line
        return `unrecognised template option: ${page} - we currently support templates for: ${acceptedTemplates.join(
          ',',
        )} - if you need a new template please raise an issue: https://github.com/brisk-docs/brisk-docs`;
      }
      return null;
    })
    .filter(a => a);

  if (errors.length > 0) {
    errors.forEach(console.error);
    throw new Error('exiting due to unparseable config');
  }

  const modifiedTemplates = templates.map(({ component, ...r }) => ({
    ...r,
    component: path.resolve(cwd, component),
  }));

  return {
    // readMePath/customPackageFields should be overridable by config
    readmePath,
    customPackageFields,
    templates: modifiedTemplates,
    ...rest,
    // docsList/packagesPaths should not be overridden. They are computed from provided docs/packages config.
    docs: docsList,
    packagesPaths,
    gatsbyNode,
  };
};

/**
 * Handles finding the config file if it exists
 * @param cwd
 * @param providedConfigPath
 * @returns {{packagesPaths: String[], docsPath: String}}
 */
const loadConfig = (cwd: string, providedConfigPath?: string) => {
  const defaultConfigPath = path.join(cwd, 'docs.config.js');

  let configPath;
  if (providedConfigPath) {
    configPath = path.resolve(cwd, providedConfigPath);
  } else if (fse.existsSync(defaultConfigPath)) {
    configPath = defaultConfigPath;
  }

  if (configPath) {
    // eslint-disable-next-line
    return require(configPath)();
  }
  return {};
};

export default (cwd: string, providedConfigPath?: string) =>
  processConfig(cwd, loadConfig(cwd, providedConfigPath));
