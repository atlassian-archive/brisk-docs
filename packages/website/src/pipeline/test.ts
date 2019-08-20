import { devPipeline } from './index';

describe('Website pipeline integration', () => {
  it('finishes', () => {
    return expect(devPipeline()).resolves.toBeUndefined();
  });
});
