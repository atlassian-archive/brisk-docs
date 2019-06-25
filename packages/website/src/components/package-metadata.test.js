import React from 'react';
import { mount } from 'enzyme';
import titleCase from 'title-case';
import PackageMetaData, { MetaDataEntry } from './package-metadata';

const baseProps = {
  id: 'id',
  fields: ['version', 'maintainers', 'repository'],
};

describe('package metadata component', () => {
  it('should render a metadata entry for each field', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        maintainers: ['Peter Y, Dean P, Ben C'],
        repository: {
          url: 'git_url',
        },
      },
    };

    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('code').text()).toEqual(props.metaData.version);
    expect(wrapper.find('p').text()).toEqual(
      props.metaData.maintainers.join(', '),
    );
    expect(wrapper.find('a').prop('href')).toEqual(
      props.metaData.repository.url,
    );
  });

  it('should not render maintainers if maintainers does not exist', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        repository: {
          url: 'git_url',
        },
      },
    };
    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(2);
  });

  it('should not render maintainers if maintainers exists but is empty', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        maintainers: [],
        repository: {
          url: 'git_url',
        },
      },
    };
    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(2);
  });

  it('should handle repository field being a string', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        maintainers: ['Peter Y'],
        repository: 'git_url',
      },
    };
    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('a').prop('href')).toEqual('git_url');
  });

  it('should handle repository field being a string and convert git suffixes', () => {
    const wrapperSshRepo = mount(
      <PackageMetaData
        {...baseProps}
        metaData={{
          version: '1.0.0',
          maintainers: ['Peter Y'],
          repository: 'fake-repo-fix-later:7997',
        }}
      />,
    );

    const wrapperHttpsRepo = mount(
      <PackageMetaData
        {...baseProps}
        metaData={{
          version: '1.0.0',
          maintainers: ['Peter Y'],
          repository: 'fake-repo-fix-later',
        }}
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
    const repository = {
      url: 'git_url/',
      directory: 'subdirectory1/subdirectory2',
    };
    const props = {
      id: 'id',
      metaData: {
        version: '1.0.0',
        maintainers: ['Peter Y, Dean P, Ben C'],
        repository,
      },
      fields: ['version', 'maintainers', 'repository'],
    };

    const wrapper = mount(<PackageMetaData {...props} />);

    expect(wrapper.find(MetaDataEntry)).toHaveLength(3);
    expect(wrapper.find('a').prop('href')).toEqual(
      repository.url + repository.directory,
    );
  });

  it('should convert the metadata label to titlecase', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        maintainers: ['Peter Y, Dean P, Ben C'],
        repository: {
          url: 'git_url',
        },
      },
    };

    const wrapper = mount(<PackageMetaData {...props} />);
    const labels = wrapper.find('MetaDataEntryLabel');

    const metaDataProperties = Object.keys(props.metaData);
    labels.forEach((component, index) => {
      expect(component.text()).toEqual(titleCase(metaDataProperties[index]));
    });
  });

  it('should render dependency objects', () => {
    const dependencies = {
      react: '^16.4',
      'react-dom': '^16.4',
      'react-redux': '^16.4',
    };

    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        dependencies,
      },
      fields: ['version', 'dependencies'],
    };

    const wrapper = mount(<PackageMetaData {...props} />);
    const deps = wrapper.find('MetaDataDependency');

    const dependencyKeys = Object.keys(dependencies);
    deps.forEach((component, index) => {
      expect(component.text()).toEqual(
        `${dependencyKeys[index]}@${dependencies[dependencyKeys[index]]}`,
      );
    });
  });

  it('should not render any MetaDataDependency components if the dependency object is empty', () => {
    const props = {
      ...baseProps,
      metaData: {
        version: '1.0.0',
        dependencies: {},
      },
      fields: ['version', 'dependencies'],
    };

    const wrapper = mount(<PackageMetaData {...props} />);
    const deps = wrapper.find('MetaDataDependency');

    expect(deps).toHaveLength(0);
  });

  it('should attempt to render unknown fields', () => {
    const props = {
      ...baseProps,
      metaData: {
        mysteryField: {
          title: 'Hello World',
        },
      },
      fields: ['mysteryField'],
    };

    const wrapper = mount(<PackageMetaData {...props} />);
    const label = wrapper.find('MetaDataEntryLabel');
    const value = wrapper.find('MetaDataEntryValue');

    expect(label.first().text()).toEqual('Mystery Field');
    expect(label.at(1).text()).toEqual('Title');

    expect(value.at(1).text()).toEqual('Hello World');
  });
});
