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
import NavLink from './link-with-router';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';

const gridSize = gridSizeFn();

export type Data = {
  packageTitle?: string;
  packageId: string;
  homePath: string;
  parentId?: string;
}[];
export type Props = {
  data: Data;
};

// gets all the packages with parentId as the param id passed
const getChildrenArray = (array: Data, id?: string) =>
  array
    .filter(y => y.parentId === id)
    .map(x => ({ id: x.packageTitle || x.packageId, pagePath: x.homePath }));

// @ts-ignore
// transforms the nested folders into the format of {id , children} required for nav to build data
const transformToNestedData = (arr, data, parentId) => {
  const [first, ...rest] = arr;
  return {
    id: first,
    parent: [parentId],
    children: first
      ? [transformToNestedData(rest, data, parentId)]
      : getChildrenArray(data, parentId),
  };
};

// @ts-ignore
// loop through each child of the existingParent until you get a matching child for every nested folder in package
const getExistingPackages = (nested, originalChildren) => {
  let nestedChild;
  let originalChild;

  for (let i = 0; i < originalChildren && originalChildren.length; i += 1) {
    const a =
      nested.children &&
      nested.children.find((y: { id: any }) => y.id === originalChildren[i].id);
    if (a) {
      nestedChild = a;
      originalChild = originalChildren[i];
      break;
    }
  }

  if (nestedChild) {
    getExistingPackages(nestedChild, originalChild.children);
  } else {
    originalChildren.push(...nested.children);
  }
};

const AllPackagesNavContent = ({ data }: Props) => {
  const dataToConvert = data.filter(y => y.parentId);
  const packagesWithParentIds: any = [];
  dataToConvert.forEach(parent => {
    if (
      packagesWithParentIds.findIndex((p: { parent: string[] }) =>
        p.parent.some(x => x === parent.parentId),
      ) < 0
    ) {
      const nestedFolders = parent.parentId && parent.parentId.split('/');
      if (nestedFolders && nestedFolders.length > 1) {
        const nestedData = transformToNestedData(
          nestedFolders,
          dataToConvert,
          parent.parentId,
        );
        const existingParent = packagesWithParentIds.find(
          (p: { id: string }) => p.id === nestedData.id,
        );
        if (existingParent) {
          existingParent.parent.push(...nestedData.parent);
          getExistingPackages(nestedData, existingParent.children);
        } else {
          packagesWithParentIds.push(nestedData);
        }
      } else {
        packagesWithParentIds.push({
          id: parent.parentId,
          parent: [parent.parentId],
          children: getChildrenArray(dataToConvert, parent.parentId),
        });
      }
    }
  });

  const treeData = packagesWithParentIds.length > 0 && {
    rootId: 'packages',
    items: packagesWithParentIds
      ? arrayToTreeItems(packagesWithParentIds, {
          parentId: 'packages',
          parentTitle: 'Packages',
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
                  <NavLink
                    key={pkg.packageId}
                    text={
                      pkg.packageTitle
                        ? titleCase(pkg.packageTitle)
                        : titleCase(pkg.packageId)
                    }
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
