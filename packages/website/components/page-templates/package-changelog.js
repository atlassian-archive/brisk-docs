import * as PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Wrapper from '../content-style-wrapper';
import NavigationWrapper from '../navigation-wrapper';
import PackageNavContent from '../navigation/package-nav-content';
import Changelog from '../../../react-changelogs/src/components/changelog';

const Heading = styled.h1`
  padding-bottom: 32px;
`;

const PackageChangelog = ({ data, children }) => {
  return (
    <NavigationWrapper
      navContent={() => (
        <PackageNavContent packageId={data.id} packageName={data.packageName} />
      )}
    >
      <Wrapper>
        <Heading>Changelog</Heading>
        <Changelog changelog={children} />
      </Wrapper>
    </NavigationWrapper>
  );
};

PackageChangelog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default PackageChangelog;
