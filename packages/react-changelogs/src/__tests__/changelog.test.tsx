import * as React from 'react';
import { mount } from 'enzyme';
import Pagination from '@atlaskit/pagination';

import Changelog from '../components/changelog';

const initialProps = `# This package itself

## 1.0.0
- [major] 24601
## 0.5.0
- [minor] Who am I?`;

const longChangeLog = `
    ## 2.0.0
    - [major] Second major
    ## 1.1.0
    - [minor] Some changes
    ## 1.0.0
    - [major] First major
    ## 0.7.2
    - [patch] Some changes
    ## 0.7.1
    - [patch] Some changes
    ## 0.7.0
    - [minor] Some changes
    ## 0.6.0
    - [minor] Some changes
    ## 0.5.0
    - [minor] Some changes
    ## 0.4.0
    - [minor] Some changes
    ## 0.3.0
    - [minor] Some changes
    ## 0.2.0
    - [minor] Some changes
    ## 0.1.2
    - [patch] Some changes
    ## 0.1.1
    - [patch] Some changes
    ## 0.1.0
    - [minor] Some changes
    ## 0.0.4
    - [patch] Some changes
    ## 0.0.3
    - [patch] Some changes
    ## 0.0.2
    - [patch] Some changes
    ## 0.0.1
    - [patch] Some changes
`;

describe('<Changelog />', () => {
  it('renders link for changelog when version url is provided', () => {
    const url = `https://bitbucket.org/atlassian/atlaskit-mk-2/commits/tag/%40atlaskit%2Fbutton%4010.1.3`;
    const myMock = jest.fn();
    myMock.mockReturnValueOnce(url);
    myMock.mockReturnValueOnce(url);
    const wrapper = mount(
      <Changelog changelog={initialProps} getUrl={myMock} />,
    );
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('renders changelog based on the specified range', () => {
    const wrapper = mount(
      <Changelog changelog={initialProps} getUrl={() => null} range=">0.5.0" />,
    );
    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('should paginate the changelog if entriesPerPage is given', () => {
    const entriesPerPage = 3;
    const wrapper = mount(
      <Changelog changelog={longChangeLog} entriesPerPage={entriesPerPage} />,
    );

    expect(wrapper.find(Pagination)).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(entriesPerPage);
    expect(
      wrapper
        .find('h3')
        .at(0)
        .text(),
    ).toEqual('2.0.0');
    expect(
      wrapper
        .find('h3')
        .at(1)
        .text(),
    ).toEqual('1.1.0');
    expect(
      wrapper
        .find('h3')
        .at(2)
        .text(),
    ).toEqual('1.0.0');

    // 6 page buttons + next and prev buttons
    expect(wrapper.find(Pagination).find('button')).toHaveLength(8);
  });

  it('should not paginate if entriesPerPage is null', () => {
    const wrapper = mount(
      <Changelog changelog={longChangeLog} entriesPerPage={null} />,
    );

    expect(wrapper.find('h3')).toHaveLength(18);
    expect(wrapper.find(Pagination).exists()).toEqual(false);
  });
});
