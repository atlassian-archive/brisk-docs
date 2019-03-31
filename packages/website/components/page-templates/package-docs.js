import React from 'react';
import * as PropTypes from 'prop-types';

import PackageNavContent from '../navigation/package-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import Wrapper from '../content-style-wrapper';
import PageTitle from '../page-title';

const PackageDocsWrapper = ({ data, children }) => (
  <>
    <PageTitle />
    <NavigationWrapper
      navContent={() => (
        <PackageNavContent packageId={data.id} packageName={data.packageName} />
      )}
    >
      <Wrapper>{children}</Wrapper>
    </NavigationWrapper>
  </>
);

PackageDocsWrapper.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default PackageDocsWrapper;
