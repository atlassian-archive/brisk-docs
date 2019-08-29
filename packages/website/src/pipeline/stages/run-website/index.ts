import createStage from '../make-pipeline-stage';

// @ts-ignore: Importing non-ts file with no definition
const createNextServer = require('./next-server');

interface StageInput {}

// Boilerplate, uncomment when used
// interface StageConfig {}

export default createStage(
  'run-website',
  async (input: StageInput): Promise<void> => {
    createNextServer(input);
  },
);
