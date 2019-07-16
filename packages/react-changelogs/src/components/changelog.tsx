import * as React from 'react';
// @ts-ignore - The types for ReactMarkdown are wrong and do not think it has a default export
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import { gridSize, colors, borderRadius } from '@atlaskit/theme';
import Pagination from '@atlaskit/pagination';
import filterChangelog from '../utils/filter-changelog';
import divideChangelog from '../utils/divide-changelog';

const gutter = gridSize() * 3;

const H3 = styled.h3`
  color: ${colors.N200};
  font-size: 18px;
  font-weight: normal;
`;
function getVersion(str: string) {
  return str.match(/^(\d+\.\d+\.\d+)/);
}
const Heading = ({
  children,
  href,
}: {
  children: React.ReactChild;
  level: number;
  packageName?: string;
  href: string | null;
}) => {
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray[0];
  const version = getVersion(title.toString());

  // wrap children if they can't be rendered e.g. array
  if (childrenArray.length !== 1) return <div>{children}</div>;
  if (typeof title !== 'string') return <div>{children}</div>;
  if (!version) return <div>{children}</div>;

  const versionNumber = version[1];
  const versionDate = version[2];
  const anchorProps = {
    href: href || '',
    rel: 'noopener noreferrer',
    style: { fontWeight: 500 },
    target: '_blank',
  };
  return (
    <H3>
      {href ? <a {...anchorProps}>{versionNumber}</a> : versionNumber}
      {versionDate ? <small> &mdash; {versionDate}</small> : null}
    </H3>
  );
};

const LogItem = styled.div`
  margin-bottom: 1em;

  ${(p: { major: boolean }) =>
    p.major
      ? `
          &:not(:first-of-type) {
            border-top: 2px solid ${colors.N30};
            margin-top: ${gutter}px;
            padding-top: ${gutter}px;
          }
        `
      : null};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const NoMatch = styled.div`
  align-items: center;
  background-color: ${colors.N20};
  border-radius: ${borderRadius}px;
  color: ${colors.N200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${gutter}px;
  min-height: 120px;
`;

export type Props = {
  /** The contents of a changelog file to be displayed. For more information on
  how we split and manage this, check out the `divide-changelogs` explanation below. */
  changelog: string;
  /* The semver range within the changelog to be displayed */
  range?: string;
  /* Function that returns a link to the commit containing the version */
  getUrl: (version: string) => string | null;
  packageName?: string;
  /* Number of changelog entries to display on a page */
  entriesPerPage?: number | null;
};

export default class Changelog extends React.Component<Props> {
  state = {
    currentPage: 1,
  };

  static defaultProps = {
    getUrl: () => null,
    changelog: '',
  };

  handlePageChange = (_e: React.ChangeEvent, newPage: number) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const {
      changelog,
      getUrl,
      range,
      packageName,
      entriesPerPage,
    } = this.props;
    const logs = divideChangelog(changelog);
    let filteredLogs = filterChangelog(logs, range);
    let pages: number[] = [];

    if (entriesPerPage) {
      const numPages = Math.ceil(filteredLogs.length / entriesPerPage);
      pages = Array.from({ length: numPages }, (_v, i) => i + 1);
      const { currentPage } = this.state;

      filteredLogs = filteredLogs.filter(
        (_v, i) =>
          i >= (currentPage - 1) * entriesPerPage &&
          i < currentPage * entriesPerPage,
      );
    }

    let currentMajor = '0';

    return (
      <div>
        {!filteredLogs.length ? (
          <NoMatch>No matching versions &mdash; please try again.</NoMatch>
        ) : (
          filteredLogs.map((v, i) => {
            const major = v.version.substr(0, 1);
            const majorHasChanged = currentMajor !== major;
            currentMajor = major;
            const href = getUrl(v.version);

            return (
              /* eslint-disable react/no-array-index-key */
              <LogItem key={`${v.version}-${i}`} major={majorHasChanged}>
                <ReactMarkdown
                  escapeHtml
                  source={v.md}
                  renderers={{
                    Heading: (props: {
                      children: React.ReactChild;
                      level: number;
                    }) => (
                      <Heading
                        packageName={packageName}
                        href={href}
                        {...props}
                      />
                    ),
                  }}
                />
              </LogItem>
            );
          })
        )}
        {entriesPerPage && pages.length > 1 && (
          <PaginationContainer>
            <Pagination pages={pages} onChange={this.handlePageChange} />
          </PaginationContainer>
        )}
      </div>
    );
  }
}
