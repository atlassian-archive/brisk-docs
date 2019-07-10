import pipeline from './index';

describe('Website pipeline integration', () => {
  it('finishes', () => {
    return expect(pipeline()).resolves.toBeUndefined();
  });
});
