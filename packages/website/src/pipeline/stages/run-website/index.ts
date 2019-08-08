import createStage from '../make-pipeline-stage';
import createParcelServer from './parcel-server';

interface StageInput {
  port: string;
  staticRoot: string;
}

// Boilerplate, uncomment when used
// interface StageConfig {}

interface StageOutput {}

export default createStage(
  'run-website',
  async (input: StageInput): Promise<StageOutput> => {
    return createParcelServer(input);
  },
);
