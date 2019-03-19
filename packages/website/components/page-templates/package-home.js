import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Banner from '@atlaskit/banner';
import titleCase from 'title-case';

import NavigationWrapper from '../navigation-wrapper';
import Wrapper from '../content-style-wrapper';
import PackageNavContent from '../navigation/package-nav-content';
import PackageMetaData from '../package-metadata';
import LinkButton from '../link-button';

export const Description = styled.h3`
  color: ${colors.N900};
  font-size: 16px;
  font-weight: 300;
  line-height: 1.4em;
  margin-top: 16px;
`;

const LinkButtonContainer = styled.div`
  margin: 0 2px;

  &:hover a {
    background-color: ${colors.N30A};
    cursor: pointer;
  }
`;

const Header = ({ id, heading }) => (
  <div
    style={{ display: 'flex', justifyContent: 'space-between' }}
    data-testid={`${id}-header`}
  >
    <h1>{heading}</h1>
    <div style={{ display: 'inline-flex' }}>
      <LinkButtonContainer>
        <LinkButton href={`/packages/${id}/examples`}>Examples</LinkButton>
      </LinkButtonContainer>
      <LinkButtonContainer>
        <LinkButton href={`/packages/${id}/docs`}>Documentation</LinkButton>
      </LinkButtonContainer>
    </div>
  </div>
);

Header.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

const MissingReadmeBanner = () => (
  <Banner
    icon={<WarningIcon label="Warning icon" secondaryColor="inherit" />}
    isOpen
  >
    There is no README for this package. This warning is only visible in dev
    mode.
  </Banner>
);

const PackageHome = ({ data, children }) => {
  return (
    <NavigationWrapper
      navContent={() => (
        <PackageNavContent packageId={data.id} packageName={data.packageName} />
      )}
    >
      <Wrapper>
        <Header id={data.id} heading={titleCase(data.packageName)} />
        <Description>{data.description}</Description>
        <PackageMetaData
          id={data.id}
          version={data.version}
          maintainers={data.maintainers}
          repository={data.repository}
        />
        {children || process.env.NODE_ENV !== 'development' ? (
          children
        ) : (
          <MissingReadmeBanner />
        )}
      </Wrapper>
    </NavigationWrapper>
  );
};

PackageHome.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
    description: PropTypes.string,
    version: PropTypes.string.isRequired,
    maintainers: PropTypes.arrayOf(PropTypes.string),
    repository: PropTypes.shape({
      url: PropTypes.string.isRequired,
      directory: PropTypes.string,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default PackageHome;
