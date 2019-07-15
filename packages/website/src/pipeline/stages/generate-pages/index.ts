import createStage from '../make-pipline-stage';

interface StageInput {}

// Boilerplate, uncomment when used
// interface StageConfig {}

export interface StageOutput {}

export default createStage(
  'generate-pages',
  async (input: StageInput): Promise<StageOutput> => {
    return input;
  },
);
