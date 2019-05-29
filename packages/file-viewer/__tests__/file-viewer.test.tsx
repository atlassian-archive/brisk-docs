import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ButtonExample from '../examples/example-files/atlaskit-button';
import FileViewer from '../src/components/file-viewer';
import ComponentWithError from './__fixtures__/component-with-error';

describe('file viewer component normal render', () => {
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

  afterEach(() => {
    wrapper.unmount();
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

describe('file viewer with error in example component', () => {
  it('should render the file viewer with a fall back error message', () => {
    console.error = jest.fn();

    const wrapper = mount(
      <FileViewer
        Component={ComponentWithError}
        source="error component source"
        title="Error component"
      />,
    );

    expect(
      wrapper
        .find('ExampleShowcase')
        .find('h4')
        .text(),
    ).toEqual('Something went wrong loading this example.');
    expect(console.error).toHaveBeenCalled();

    wrapper.unmount();
  });
});
