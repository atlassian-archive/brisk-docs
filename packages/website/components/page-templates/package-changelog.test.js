import { mount } from 'enzyme';
import PackageChangelog, { MissingChangelog } from './package-changelog';
import Changelog from '../../../react-changelogs/src/components/changelog';

jest.mock('../navigation/package-nav-content', () => () => <div />);
/* eslint-disable react/prop-types */
jest.mock('../navigation-wrapper', () => ({ children }) => (
  <div>{children}</div>
));
/* eslint-disable react/prop-types */
const data = {
  id: 'test_id',
  packageName: 'name',
};

const major = '[major] abc1234:';
const minor = '[minor] e342242:';
const majorChanges = ['Changes', 'More changes', 'Some more changes'];
const minorChanges = [
  'Fix binary',
  'Add dev binary command and make start use next start',
];

const changelog = `
# @brisk-docs/website

## 1.0.0
- ${major}

  - ${majorChanges[0]}
  - ${majorChanges[1]}
  - ${majorChanges[2]}

## 0.2.0
- ${minor}

  - ${minorChanges[0]}
  - ${minorChanges[1]}
`;

describe('package changelog', () => {
  it('should render the changelog of a package', () => {
    const wrapper = mount(
      <PackageChangelog data={data}>{changelog}</PackageChangelog>,
    );

    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual('Changelog');

    expect(wrapper.find(Changelog)).toHaveLength(1);
    wrapper.unmount();
  });

  it('should render the version type of each changeset,', () => {
    const wrapper = mount(
      <PackageChangelog data={data}>{changelog}</PackageChangelog>,
    );

    expect(
      wrapper
        .find(Changelog)
        .find('p')
        .at(0)
        .text(),
    ).toEqual(major);
    expect(
      wrapper
        .find(Changelog)
        .find('p')
        .at(1)
        .text(),
    ).toEqual(minor);

    wrapper.unmount();
  });

  it('should render lists of changes', () => {
    const wrapper = mount(
      <PackageChangelog data={data}>{changelog}</PackageChangelog>,
    );

    // Get the nested lists containing changes
    const listItems = wrapper
      .find(Changelog)
      .find('ul')
      .children()
      .filterWhere(n => !n.find('p').exists());

    expect(listItems).toHaveLength(majorChanges.length + minorChanges.length);
    expect(listItems.at(0).text()).toEqual(majorChanges[0]);
    expect(listItems.at(1).text()).toEqual(majorChanges[1]);
    expect(listItems.at(2).text()).toEqual(majorChanges[2]);
    expect(listItems.at(3).text()).toEqual(minorChanges[0]);
    expect(listItems.at(4).text()).toEqual(minorChanges[1]);

    wrapper.unmount();
  });

  it('should render a warning banner if there is no changelog', () => {
    const wrapper = mount(<PackageChangelog data={data} />);

    expect(wrapper.find(Changelog).exists()).toEqual(false);
    expect(wrapper.find(MissingChangelog).exists()).toEqual(true);

    wrapper.unmount();
  });
});
