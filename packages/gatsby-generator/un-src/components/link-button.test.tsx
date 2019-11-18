import React from 'react';
import { mount } from 'enzyme';
import LinkComponent from './navigation/link-component';

import LinkButton from './link-button';

describe('LinkButton', () => {
  it('should render an anchor', () => {
    const wrapper = mount(<LinkButton href="/foo">Foo</LinkButton>);

    const anchor = wrapper.find('a');
    expect(anchor).toHaveLength(1);
    expect(anchor.prop('href')).toEqual('/foo');
  });

  it('should render a next LinkComponent component', () => {
    const wrapper = mount(<LinkButton href="/foo">Foo</LinkButton>);

    const link = wrapper.find(LinkComponent);
    expect(link).toHaveLength(1);
    expect(link.prop('href')).toEqual('/foo');
  });

  it('should not remount its contents across re-renders', () => {
    const wrapper = mount(<LinkButton href="/foo">Foo</LinkButton>);

    const anchorBefore = wrapper.find('a').instance();
    const linkBefore = wrapper.find(LinkComponent).instance();

    // Triggers a re-render
    wrapper.setProps({});

    const anchorAfter = wrapper.find('a').instance();
    const linkAfter = wrapper.find(LinkComponent).instance();

    expect(anchorBefore).toBe(anchorAfter);
    // Note: doing expect(linkBefore).toBe(linkAfter) causes infinite loop (OOM) in jests object equality reporting tool
    // since the component instances are recursive.
    expect(linkBefore === linkAfter).toBe(true);
  });
});
