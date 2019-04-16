import assertValidTemplate from '../test-utils';
import exampleTemplate from './index';

describe('example page template', () => {
  it('creates valid source code for a page', () => {
    const source = exampleTemplate('./component/path', './wrapper/path');

    assertValidTemplate(source);
  });

  it('creates an array of each export to render', () => {
    const source = exampleTemplate('./component/path', './wrapper/path');

    console.log(source);
  });
});
