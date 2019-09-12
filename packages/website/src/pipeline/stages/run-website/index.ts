import createStage from '../make-pipeline-stage';

// @ts-ignore: Importing non-ts file with no definition
import createNextServer from './next-server';

interface StageInput {
  command: string;
  configPath?: string;
  pkgRoot: string;
  rootPath: string;
  nextOptions?: string[];
}

// Boilerplate, uncomment when used
// interface StageConfig {}

export default createStage(
  'run-website',
  async (input: StageInput): Promise<void> => {
    createNextServer(input);
  },
);
