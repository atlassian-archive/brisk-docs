import React from 'react';
import * as PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SectionMessage from '@atlaskit/section-message';

import Wrapper from '../content-style-wrapper';
import NavigationWrapper from '../navigation-wrapper';
import PackageNavContent from '../navigation/package-nav-content';
import PageTitle from '../page-title';
import Changelog from '../../../react-changelogs/src/components/changelog';

const Heading = styled.h1`
  padding-bottom: 32px;
`;

export const MissingChangelog = () => (
  <SectionMessage appearance="warning">
    This package does not have a Changelog yet. Add one to easily keep track of
    versions and changes made.
  </SectionMessage>
);

const PackageChangelog = ({ data, children }) => {
  return (
    <>
      <PageTitle title="Changelog" />
      <NavigationWrapper
        navContent={() => (
          <PackageNavContent
            packageId={data.id}
            packageName={data.packageName}
          />
        )}
      >
        <Wrapper>
          <Heading>Changelog</Heading>
          {children ? (
            <Changelog changelog={children} entriesPerPage={20} />
          ) : (
            <MissingChangelog />
          )}
        </Wrapper>
      </NavigationWrapper>
    </>
  );
};

PackageChangelog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default PackageChangelog;
