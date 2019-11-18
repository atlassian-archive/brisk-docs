import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

import BreadcrumbsNav, { isPathRoot } from './breadcrumbs';

describe('breadcrumbs component', () => {
  it('should render breadcrumbs for each folder in path', () => {
    const path = '/docs/content/guides';
    const wrapper = shallow(<BreadcrumbsNav pagePath={path} />);

    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
    expect(wrapper.find(BreadcrumbsItem)).toHaveLength(3);

    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(0)
        .prop('href'),
    ).toEqual('/docs');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(0)
        .prop('text'),
    ).toEqual('Docs');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(0)
        .prop('component'),
    ).toBeDefined();

    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(1)
        .prop('href'),
    ).toEqual('/docs/content');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(1)
        .prop('text'),
    ).toEqual('Content');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(1)
        .prop('component'),
    ).toBeDefined();

    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(2)
        .prop('href'),
    ).toEqual('/docs/content/guides');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(2)
        .prop('text'),
    ).toEqual('Guides');
    expect(
      wrapper
        .find(BreadcrumbsItem)
        .at(2)
        .prop('component'),
    ).toBeDefined();
  });
});

describe('isPathRoot function', () => {
  it('should return true when the path is the root', () => {
    const path = '/docs';
    const isRoot = isPathRoot(path);

    expect(isRoot).toBe(true);
  });

  it('should return false when the path is empty', () => {
    const path = '/';
    const isRoot = isPathRoot(path);

    expect(isRoot).toBe(false);
  });

  it('should return false when the path has more than one folder', () => {
    const path = '/docs/nested-folder/something';
    const isRoot = isPathRoot(path);

    expect(isRoot).toBe(false);
  });
});
