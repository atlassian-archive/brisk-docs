import createStage from '../make-pipline-stage';

interface StageInput {}

interface StageOutput {}

export default createStage(
  'generate-pages',
  async (input: StageInput): Promise<StageOutput> => {
    return input;
  },
);
