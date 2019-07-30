import * as React from 'react';
import { mount } from 'enzyme';

import SwitchLink from '../../src/components/switch-link';

const children = 'some text';

const initialProps = {
  children: () => 'some text',
  href: '/atlaskit',
};

describe('<SwitchLink />', () => {
  it('renders as an anchor when no href is provided', () => {
    const wrapper = mount(<SwitchLink {...initialProps} href="" />);
    const component = wrapper.find('a');

    expect(component.exists()).toBeTruthy();
    expect(component.text()).toEqual(children);
    expect(component.prop('href')).toEqual('');
  });

  it('renders as an anchor when the href is a page heading', () => {
    const wrapper = mount(<SwitchLink {...initialProps} href="#Hello" />);
    const component = wrapper.find('a');

    expect(component.exists()).toBeTruthy();
    expect(component.text()).toEqual(children);
    expect(component.prop('href')).toEqual('#Hello');
  });

  it('renders an anchor with a shortcut icon when the link is external', () => {
    const wrapper = mount(
      <SwitchLink {...initialProps} href="https://atlassian.com" />,
    );
    const component = wrapper.find('a');

    expect(component.exists()).toBeTruthy();
    expect(component.text()).toContain(children);
    expect(component.prop('href')).toEqual('https://atlassian.com');
    expect(wrapper.find('ShortcutIcon')).toHaveLength(1);
  });

  it('renders an anchor without a shortcut icon when the link is external but enableShortcutIcon is disabled', () => {
    const wrapper = mount(
      <SwitchLink
        {...initialProps}
        href="https://atlassian.com"
        includeShortcutIcon={false}
      />,
    );
    const component = wrapper.find('a');

    expect(component.exists()).toBeTruthy();
    expect(component.text()).toContain(children);
    expect(component.prop('href')).toEqual('https://atlassian.com');
    expect(wrapper.find('ShortcutIcon')).toHaveLength(0);
  });

  it('renders a Link component for relative links', () => {
    const wrapper = mount(<SwitchLink {...initialProps} />);
    const component = wrapper.find('Link');

    expect(component.exists()).toBeTruthy();
    expect(component.text()).toEqual(children);
    expect(component.prop('href')).toEqual(initialProps.href);
  });
});
