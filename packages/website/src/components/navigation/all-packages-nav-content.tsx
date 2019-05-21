import * as React from 'react';
import {
  ContainerHeader,
  HeaderSection,
  ItemAvatar,
  MenuSection,
  Group,
} from '@atlaskit/navigation-next';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';

const gridSize = gridSizeFn();

export type Data = { packageId: string; homePath: string; parentId?: string }[];
export type Props = {
  data: Data;
};
export type Page = {
  id: string;
  pagePath: string;
  children: any;
}[];
const getChildrenArray = (array: Data, id?: string) =>
  array
    .filter(y => y.parentId === id)
    .map(x => ({ id: x.packageId, pagePath: x.homePath }));

const AllPackagesNavContent = ({ data }: Props) => {
  const dataToConvert = data.filter(y => y.parentId);
  const packagesWithParentIds: any = [];
  dataToConvert.forEach(parent => {
    if (
      packagesWithParentIds.findIndex(
        (p: { id: string | undefined }) => p.id === parent.parentId,
      ) < 0
    ) {
      packagesWithParentIds.push({
        id: parent.parentId,
        pagePath: parent.parentId,
        children: getChildrenArray(dataToConvert, parent.parentId),
      });
    }
  });

  const treeData = packagesWithParentIds.length > 0 && {
    rootId: 'packages',
    items: packagesWithParentIds
      ? arrayToTreeItems(packagesWithParentIds, {
          parentId: 'packages',
          parentTitle: 'packages',
        })
      : {},
  };
  return (
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
            {/* TODO: Hiding for the time being */}
            {/* <BackItem text="Back to home" href="/" component={LinkComponent} /> */}
            {/* <Separator /> */}
            <Group heading="" id="pkg-group" hasSeparator>
              {data
                .filter(x => !x.parentId)
                .map(pkg => (
                  <LinkWithRouter
                    key={pkg.packageId}
                    text={titleCase(pkg.packageId)}
                    href={pkg.homePath}
                  />
                ))}
            </Group>
            {treeData && <TreeNavContent treeData={treeData} />}
          </div>
        )}
      </MenuSection>
    </>
  );
};

export default AllPackagesNavContent;
