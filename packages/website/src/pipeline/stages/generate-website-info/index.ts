import createStage from '../make-pipline-stage';

interface StageInput {}

interface StageOutput {}

export default createStage(
  'generate-website-info',
  async (input: StageInput): Promise<StageOutput> => {
    return input;
  },
);
