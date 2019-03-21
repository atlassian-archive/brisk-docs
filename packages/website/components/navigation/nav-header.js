import {
  ContainerHeader,
  HeaderSection,
  ItemAvatar,
} from '@atlaskit/navigation-next';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import titleCase from 'title-case';
import * as PropTypes from 'prop-types';

/** @jsx jsx */
import { jsx } from '@emotion/core';

const gridSize = gridSizeFn();

const NavHeader = ({ headerText }) => (
  <HeaderSection>
    {({ css }) => (
      <div
        css={{
          ...css,
          paddingTop: `${gridSize * 2.5}px`,
          paddingBottom: `${gridSize * 2.5}px`,
        }}
      >
        <ContainerHeader
          before={itemState => (
            <ItemAvatar
              itemState={itemState}
              appearance="square"
              size="large"
            />
          )}
          text={titleCase(headerText)}
        />
      </div>
    )}
  </HeaderSection>
);

NavHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default NavHeader;
