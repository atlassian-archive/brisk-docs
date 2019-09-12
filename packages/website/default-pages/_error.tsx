import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { NextContext } from 'next';

import LinkButton from '../un-src/components/link-button';

const Page = styled.div`
  background-color: ${colors.B500};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;

const StatusCode = styled.div`
  color: white;
  font-size: 50px;
`;

const Message = styled.div`
  color: white;
  font-size: 32px;
  margin-bottom: 24px;
`;

const packagesPath = /\/packages\/.*/g;
const docsPath = /\/docs\/.*/g;

export type Props = {
  statusCode: number;
  pageType: string;
};

// Next sometimes adds a statusCode to its thrown errors, so we need to check for this
interface InitialProps extends NextContext {
  err: Error & { statusCode?: number };
}

class NotFound extends React.Component<Props> {
  static getInitialProps({ res, asPath, err }: InitialProps) {
    const error = err ? err.statusCode : null;
    const statusCode = res ? res.statusCode : error;

    let pageType = '';
    const isPackage = packagesPath.exec(asPath);
    const isDoc = docsPath.exec(asPath);

    if (isPackage) {
      pageType = 'packages';
    } else if (isDoc) {
      pageType = 'docs';
    }
    return { statusCode, pageType };
  }

  render() {
    const { statusCode, pageType } = this.props;

    return (
      <Page>
        <StatusCode>{statusCode}</StatusCode>
        <Message>
          {statusCode === 404
            ? `Sorry, that ${pageType ? `${pageType} ` : ''}page does not
                        exist.`
            : 'An error has occurred.'}
        </Message>
        <LinkButton href={`/${pageType}`} appearance="warning">
          <div>Back to {pageType || 'home'}</div>
        </LinkButton>
      </Page>
    );
  }
}

export default NotFound;
