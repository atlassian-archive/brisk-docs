import createStage from '../make-pipeline-stage';
// @ts-ignore
import CreateNextServer from '../run-website/next-server';

interface StageInput {}

// Boilerplate, uncomment when used
// interface StageConfig {}

interface StageOutput {}

export default createStage(
  'build-website',
  async (input: StageInput): Promise<StageOutput> => {
    return CreateNextServer(input);
  },
);
