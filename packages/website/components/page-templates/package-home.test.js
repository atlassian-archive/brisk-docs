import { shallow, mount } from 'enzyme';
import titleCase from 'title-case';
import PackageHomeWrapper, { Description } from './package-home';

jest.mock('../navigation/package-nav-content', () => () => <div />);
/* eslint-disable react/prop-types */
jest.mock('../navigation-wrapper', () => ({children}) => <div>{children}</div>);
/* eslint-disable react/prop-types */

const data = {
  id: 'test_id',
  packageName: 'name',
  description: 'description',
  version: '1.0.0',
  maintainers: ['user1', 'user2'],
  repository: { url: 'git.url' },
};

describe('package home wrapper component', () => {
  it('should render a header with the package name and button links to /examples and /docs', () => {
    const wrapper = mount(
      <PackageHomeWrapper data={data}>
        <div>Hello</div>
      </PackageHomeWrapper>,
    );

    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual(titleCase(data.packageName));

    const linkButtons = wrapper.find('LinkButton');
    expect(linkButtons).toHaveLength(2);
    expect(linkButtons.at(0).prop('href')).toEqual(
      `/packages/${data.id}/examples`,
    );
    expect(linkButtons.at(1).prop('href')).toEqual(`/packages/${data.id}/docs`);

    wrapper.unmount();
  });

  it('should render package description', () => {
    const wrapper = shallow(
      <PackageHomeWrapper data={data}>
        <div>Hello</div>
      </PackageHomeWrapper>,
    );

    expect(wrapper.find(Description)).toHaveLength(1);
    expect(
      wrapper
        .find(Description)
        .children()
        .text(),
    ).toEqual(data.description);
  });
});
