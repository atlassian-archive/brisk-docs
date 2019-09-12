import { devPipeline } from './index';

describe('Website pipeline integration', () => {
  it.skip('finishes', () => {
    return expect(devPipeline()).resolves.toBeUndefined();
  });
});
