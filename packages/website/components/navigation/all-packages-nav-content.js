import React from 'react';
import {
  ContainerHeader,
  HeaderSection,
  ItemAvatar,
  MenuSection,
  BackItem,
  Separator,
  Group,
} from '@atlaskit/navigation-next';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import * as PropTypes from 'prop-types';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import LinkComponent from './link-component';

const gridSize = gridSizeFn();

const AllPackagesNavContent = ({ data }) => (
  <>
    <HeaderSection>
      {({ css }) => (
        <div
          // eslint-disable-next-line emotion/jsx-import
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
            text="Brisk Documentation"
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection id="package-section" parentId="index-section">
      {({ className }) => (
        <div className={className}>
          <BackItem text="Back to home" href="/" component={LinkComponent} />
          <Separator />
          <Group heading="" id="pkg-group" hasSeparator>
            {data.map(pkg => (
              <LinkWithRouter
                key={pkg.packageId}
                text={titleCase(pkg.packageId)}
                href={pkg.homePath}
              />
            ))}
          </Group>
        </div>
      )}
    </MenuSection>
  </>
);

AllPackagesNavContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      packageId: PropTypes.string.isRequired, // TODO: May Need other data like owners, version etc from package.json
    }),
  ).isRequired,
};

export default AllPackagesNavContent;
