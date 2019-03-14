import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import styled, {css} from "styled-components";
import { math, gridSize, colors, borderRadius } from '@atlaskit/theme';
// @ts-ignore
import filterChangelog from "../utils/filter-changelog.ts";
// @ts-ignore
import divideChangelog from "../utils/divide-changelog.ts";

const gutter = math.multiply(gridSize, 3);

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
    packageName: string;
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
        href: href ? href : "" ,
        rel: 'noopener noreferrer',
        style: { fontWeight: 500 },
        target: '_blank',
    };
    return (
        <H3>
            {(href ? <a {...anchorProps}>{versionNumber}</a> : versionNumber)}
            {versionDate ? <small> &mdash; {versionDate}</small> : null}
        </H3>
    );
};

const LogItem = styled.div`
  margin-bottom: 1em;

  ${(p: { major: boolean }) =>
    p.major
        ? css`
          &:not(:first-child) {
            border-top: 2px solid ${colors.N30};
            margin-top: ${gutter}px;
            padding-top: ${gutter}px;
          }
        `
        : null};
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
    changelog: string;
    range?: string;
    getUrl: (version: string) => string | null;
    packageName?: string;
};

export default class Changelog extends React.Component<Props> {
    props: Props; // eslint-disable-line react/sort-comp
//      static defaultProps  = {
//         getUrl: () => null
// };

    render() {
        const { changelog, getUrl, range, packageName } = this.props;
        const logs = divideChangelog(changelog);
        const filteredLogs = filterChangelog(logs, range);

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
                                        Heading: props => (
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
            </div>
        );
    }
}
