import assertValidTemplate from '../test-utils';
import { exampleTemplate, exampleWithDecoratorTemplate } from './index';

describe('example page template', () => {
  it('creates valid source code for an example page', () => {
    const source = exampleTemplate('./component/path', './wrapper/path');

    assertValidTemplate(source);
  });

  it('creates valid source code for an example with decorator page', () => {
    const source = exampleWithDecoratorTemplate(
      './component/path',
      './wrapper/path',
      {},
      './decorator/path',
    );

    assertValidTemplate(source);
  });
});
