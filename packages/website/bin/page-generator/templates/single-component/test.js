import { assertValidTemplate } from '../test-utils';
import singleComponentTemplate from './index';

describe('changelog page templates', () => {
  describe('with content', () => {
    it('creates valid source code for a page', () => {
      const source = singleComponentTemplate();

      assertValidTemplate(source);
    });
  });
});
