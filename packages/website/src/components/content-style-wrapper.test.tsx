import React from 'react';
import { shallow } from 'enzyme';
import ContentWrapper from './content-style-wrapper';
import Breadcrumbs from './breadcrumbs';

describe('content style wrapper component', () => {
  it('should not render breadcrumbs if the page path is the root', () => {
    const path = '/docs';

    const wrapper = shallow(
      <ContentWrapper pagePath={path}>
        <div>Page content</div>
      </ContentWrapper>,
    );

    expect(wrapper.find(Breadcrumbs)).toHaveLength(0);
  });

  it('should not render breadcrumbs if the page path is not defined', () => {
    const wrapper = shallow(
      <ContentWrapper>
        <div>Page content</div>
      </ContentWrapper>,
    );

    expect(wrapper.find(Breadcrumbs)).toHaveLength(0);
  });

  it('should render breadcrumbs if the page path has more than one folder', () => {
    const path = '/docs/hello';

    const wrapper = shallow(
      <ContentWrapper pagePath={path}>
        <div>Page content</div>
      </ContentWrapper>,
    );

    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
  });
});
