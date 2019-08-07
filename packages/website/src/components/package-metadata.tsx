import React from 'react';
import styled from '@emotion/styled';
import GitUrlParse from 'git-url-parse';
import titleCase from 'title-case';
import { colors, gridSize, math } from '@atlaskit/theme';

const MetaDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  border-bottom: 2px solid ${colors.N30};
  margin-bottom: 24px;
`;

export const MetaDataEntry = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  padding: 0 0 0.8em;
  margin: 0;
`;

const MetaDataEntryLabel = styled.div`
  color: ${colors.N200};
  flex-basis: 25%;
`;

const MetaDataEntryValue = styled.div`
  flex-basis: 75%;
  flex-wrap: wrap;
`;

const MetaDataDependency = styled.code`
  display: inline-flex;
  margin: 0 ${math.multiply(gridSize, 0.5)}px;
`;

const MetaDataArray = styled.p`
  margin: 0;
`;

function parseRepositoryUrl(repository: string, directory?: string): string {
  let url;
  const parsed = GitUrlParse(repository);
  if (parsed.git_suffix) {
    if (parsed.resource === 'github.com') {
      url = `${parsed.toString('https').replace('.git', '')}`;
    } else {
      url = `https://${parsed.resource}/projects/${parsed.owner
        .replace('scm/', '')
        .toUpperCase()}/repos/${parsed.name}`;
    }
    if (directory) {
      url = `${url}/tree/master/${directory}`;
    }
  } else {
    url = repository.replace(/\/$/, ''); // Remove trailing slash if there is one
    if (directory) {
      url = `${url}/${directory}`;
    }
  }
  return url;
}

type Repository = string | { url: string; directory: string };

const RepositoryLink = ({ repository }: { repository: Repository }) => {
  if (!repository) return null;

  let repositoryUrl;
  if (typeof repository === 'string') {
    repositoryUrl = parseRepositoryUrl(repository);
  } else if (repository.directory) {
    repositoryUrl = parseRepositoryUrl(repository.url, repository.directory);
  } else {
    repositoryUrl = parseRepositoryUrl(repository.url);
  }

  return <a href={repositoryUrl}>View Source</a>;
};

function formatArrayValue(value: string[]): JSX.Element | null {
  if (!value || value.length < 1) {
    return null;
  }

  return <MetaDataArray>{value.join(', ')}</MetaDataArray>;
}

type DependencyList = {
  [e: string]: string;
};

const DependencyList = ({ dependencies }: { dependencies: DependencyList }) => {
  const result: JSX.Element[] = [];

  Object.keys(dependencies).forEach(key => {
    const nestedValue = (dependencies as any)[key];

    if (typeof nestedValue === 'string') {
      result.push(
        <MetaDataDependency key={key}>
          {key}
          {'@'}
          {nestedValue}
        </MetaDataDependency>,
      );
    }
  });

  return <>{result}</>;
};

function renderUnknownMetaDataObject(value?: any): JSX.Element | null {
  const keys = Object.keys(value);

  if (!keys || keys.length < 1) {
    return null;
  }

  return (
    <>
      {keys.map(key => {
        return <MetaDataRow key={key} label={key} value={value[key]} />;
      })}
    </>
  );
}

type MetaDataField = string | string[] | DependencyList | Repository;

function renderMetaDataValue(
  label: string,
  rawValue?: MetaDataField,
): JSX.Element | null {
  if (!rawValue) {
    return null;
  }

  if (Array.isArray(rawValue)) {
    return formatArrayValue(rawValue);
  }

  if (
    [
      'bundledDependencies',
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ].includes(label)
  ) {
    return <DependencyList dependencies={rawValue as DependencyList} />;
  }

  if (label === 'repository') {
    return <RepositoryLink repository={rawValue as Repository} />;
  }

  if (typeof rawValue === 'object') {
    return renderUnknownMetaDataObject(rawValue);
  }

  return <code>{rawValue}</code>;
}

type MetaDataRowProps = {
  label: string;
  value?: MetaDataField;
};

const MetaDataRow = ({ label, value }: MetaDataRowProps) => {
  const rowValue = renderMetaDataValue(label, value);

  if (!rowValue) {
    return null;
  }

  return (
    <MetaDataEntry>
      <MetaDataEntryLabel>{titleCase(label)}</MetaDataEntryLabel>
      <MetaDataEntryValue>{rowValue}</MetaDataEntryValue>
    </MetaDataEntry>
  );
};

interface MetaData {
  [e: string]: MetaDataField;
}

export type Props = {
  id: string;
  metaData: MetaData;
  fields: string[];
};

const PackageMetaData = ({ id, metaData, fields }: Props) => (
  <MetaDataWrapper data-testid={`${id}-metadata`}>
    {fields.map(field => (
      <MetaDataRow key={field} label={field} value={metaData[field]} />
    ))}
  </MetaDataWrapper>
);

PackageMetaData.defaultProps = {
  fields: [],
};

export default PackageMetaData;
