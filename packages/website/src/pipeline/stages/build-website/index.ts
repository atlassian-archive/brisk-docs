import createStage from '../make-pipeline-stage';
// @ts-ignore
import createNextServer from '../run-website/next-server';

interface StageInput {}

// Boilerplate, uncomment when used
// interface StageConfig {}

interface StageOutput {}

export default createStage(
  'build-website',
  async (input: StageInput): Promise<StageOutput> => {
    return createNextServer(input);
  },
);
