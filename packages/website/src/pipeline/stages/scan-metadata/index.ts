import createStage from '../make-pipline-stage';

interface StageInput {}

interface StageOutput {}

export default createStage(
  'scan-metadata',
  async (input: StageInput): Promise<StageOutput> => {
    return input;
  },
);
