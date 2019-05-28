import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ButtonExample from '../examples/example-files/atlaskit-button';
import FileViewer from '../src/components/file-viewer';

describe('file viewer component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <FileViewer
        Component={ButtonExample}
        source="button source"
        title="Button"
      />,
    );
  });

  it('should render file viewer component', () => {
    expect(wrapper.find('Button')).toBeDefined();
    expect(wrapper.find('Wrapper').prop('state')).toBe('normal');
    expect(wrapper.find('Wrapper').prop('mode')).toBe('closed');
    expect(wrapper.find('ToggleTitle').text()).toBe('Button');
    expect(wrapper.find('CodeStyle').exists()).toBe(false);
  });

  it('should change Wrapper state on hover', () => {
    wrapper.find('Toggle').simulate('mouseOver');

    expect(wrapper.find('Wrapper').prop('state')).toBe('hover');
  });

  it('should render the source code when clicked', () => {
    wrapper.find('Toggle').simulate('click');

    expect(wrapper.find('Wrapper').prop('mode')).toBe('open');
    expect(wrapper.find('CodeStyle').exists()).toBe(true);
  });
});
