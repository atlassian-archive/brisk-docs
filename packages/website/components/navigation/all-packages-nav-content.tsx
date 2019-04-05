import * as React from 'react';
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

import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import LinkComponent from './link-component';

const gridSize = gridSizeFn();

export type Props = {
  data: { packageId: string; homePath: string }[];
};

const AllPackagesNavContent = ({ data }: Props) => (
  <>
    <HeaderSection>
      {/* TODO: TSFix nav typing */}
      {({ css }: { css: {} }) => (
        <div
          // This works because navigation-next is importing
          // an old version of emotion. It also prevents us from
          // using the jsx import from @emotion/core
          // eslint-disable-next-line emotion/jsx-import
          css={{
            ...css,
            paddingTop: `${gridSize * 2.5}px`,
            paddingBottom: `${gridSize * 2.5}px`,
          }}
        >
          <ContainerHeader
            // TODO: TSFix nav typing
            before={(itemState: any) => (
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
      {/* TODO: TSFix nav typing */}
      {({ className }: { className: string }) => (
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

export default AllPackagesNavContent;
