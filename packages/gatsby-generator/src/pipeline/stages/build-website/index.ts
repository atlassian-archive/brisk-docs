import createStage from '../make-pipeline-stage';
// @ts-ignore
import createNextServer from '../run-website/next-server';

interface StageInput {
  command: string;
  configPath?: string;
  pkgRoot: string;
  rootPath: string;
  nextOptions?: string[];
}

export default createStage(
  'build-website',
  async (input: StageInput): Promise<void> => {
    return createNextServer(input);
  },
);
