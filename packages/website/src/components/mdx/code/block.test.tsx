import React from 'react';
import { shallow } from 'enzyme';
import { AkCodeBlock } from '@atlaskit/code';

import CodeBlock from './block';

const sampleCode = 'const x = 1;';

describe('Code block markdown component', () => {
  it('renders a AkCodeBlock component', () => {
    const wrapper = shallow(<CodeBlock>{sampleCode}</CodeBlock>);
    const codeBlocks = wrapper.find(AkCodeBlock);
    expect(codeBlocks).toHaveLength(1);
    expect(codeBlocks.first().props()).toHaveProperty('text', sampleCode);
  });

  it('transforms the language classname to select the rendered language', () => {
    const wrapper = shallow(
      <CodeBlock className="language-js">{sampleCode}</CodeBlock>,
    );

    expect(
      wrapper
        .find(AkCodeBlock)
        .first()
        .props(),
    ).toHaveProperty('language', 'js');
  });
});
