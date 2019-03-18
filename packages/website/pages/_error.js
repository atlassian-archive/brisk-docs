import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';

import LinkButton from '../components/link-button';

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

class NotFound extends React.Component {
  static getInitialProps(res, err) {
    const error = err ? err.statuCode : null;
    const statusCode = res ? res.res.statusCode : error;

    let pageType = '';
    const isPackage = packagesPath.exec(res.asPath);
    const isDoc = docsPath.exec(res.asPath);

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
          Back to {pageType || 'home'}
        </LinkButton>
      </Page>
    );
  }
}

NotFound.propTypes = {
  statusCode: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default NotFound;
