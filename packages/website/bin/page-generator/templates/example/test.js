import { assertValidTemplate } from '../test-utils';
import exampleTemplate from './index';

describe('example page template', () => {
  it('creates valid source code for a page', () => {
    const source = exampleTemplate();

    assertValidTemplate(source);
  });
});
