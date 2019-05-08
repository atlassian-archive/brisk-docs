import * as React from 'react';
import styled from '@emotion/styled';
import GitUrlParse from 'git-url-parse';

import { colors } from '@atlaskit/theme';

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
  padding: 0.4em 0;
  margin: 0;
`;

const MetaDataEntryLabel = styled.div`
  color: ${colors.N200};
  flex-basis: 25%;
`;

function parseRepositoryUrl(repository: string, directory?: string) {
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

  return (
    <MetaDataEntry>
      <MetaDataEntryLabel>Source</MetaDataEntryLabel>
      <a href={repositoryUrl}>View Source</a>
    </MetaDataEntry>
  );
};

export type Props = {
  id: string;
  version: string;
  maintainers: string[];
  repository: Repository;
};

const PackageMetaData = ({ id, version, maintainers, repository }: Props) => (
  <div>
    <MetaDataWrapper data-testid={`${id}-metadata`}>
      <MetaDataEntry>
        <MetaDataEntryLabel>Latest version</MetaDataEntryLabel>
        <code>{version}</code>
      </MetaDataEntry>
      {maintainers && maintainers.length > 0 && (
        <MetaDataEntry>
          <MetaDataEntryLabel>Maintainers</MetaDataEntryLabel>
          <p style={{ margin: '0' }}>{maintainers.join(', ')}</p>
        </MetaDataEntry>
      )}
      <RepositoryLink repository={repository} />
    </MetaDataWrapper>
  </div>
);

export default PackageMetaData;
