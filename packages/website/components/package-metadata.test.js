import { mount } from 'enzyme';
import PackageMetaData, { MetaDataEntry } from './package-metadata';

describe('package metadata component', () => {
  it('should render a metadata entry for each field', () => {
    const props = {
      id: 'id',
      version: '1.0.0',
      maintainers: ['Peter Y, Dean P, Ben C'],
      repository: {
        url: 'git_url',
      },
    };

    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('code').text()).toEqual(props.version);
    expect(wrapper.find('p').text()).toEqual(props.maintainers.join(', '));
    expect(wrapper.find('a').prop('href')).toEqual(props.repository.url);
  });

  it('should not render maintainers if maintainers does not exist', () => {
    const wrapper = mount(
      <PackageMetaData
        id="id"
        version="1.0.0"
        repository={{ url: 'git_url' }}
      />,
    );

    expect(wrapper.find(MetaDataEntry)).toHaveLength(2);
  });

  it('should not render maintainers if maintainers exists but is empty', () => {
    const wrapper = mount(
      <PackageMetaData
        id="id"
        version="1.0.0"
        maintainers={[]}
        repository={{ url: 'git_url' }}
      />,
    );

    expect(wrapper.find(MetaDataEntry)).toHaveLength(2);
  });

  it('should handle repository field being a string', () => {
    const wrapper = mount(
      <PackageMetaData
        id="id"
        version="1.0.0"
        maintainers={['Peter Y']}
        repository="git_url"
      />,
    );

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('a').prop('href')).toEqual('git_url');
  });

  it('should handle repository field being a string and convert git suffixes', () => {
    const wrapperSshRepo = mount(
      <PackageMetaData
        id="id"
        version="1.0.0"
        maintainers={['Peter Y']}
        repository="fake-repo-fix-later:7997"
      />,
    );

    const wrapperHttpsRepo = mount(
      <PackageMetaData
        id="id"
        version="1.0.0"
        maintainers={['Peter Y']}
        repository="fake-repo-fix-later"
      />,
    );

    expect(wrapperSshRepo.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapperSshRepo.find('a').prop('href')).toEqual(
      'fake-repo-fix-later:7997',
    );
    expect(wrapperHttpsRepo.find('a').prop('href')).toEqual(
      'fake-repo-fix-later',
    );
  });

  it('should include repository directory in link if it exists', () => {
    const props = {
      id: 'id',
      version: '1.0.0',
      maintainers: ['Peter Y, Dean P, Ben C'],
      repository: {
        url: 'git_url/',
        directory: 'subdirectory1/subdirectory2',
      },
    };

    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('a').prop('href')).toEqual(
      props.repository.url + props.repository.directory,
    );
  });
});
