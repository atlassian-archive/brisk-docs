import * as React from 'react';
import { MenuSection } from '@atlaskit/navigation-next';
import pageInfo from '../../pages-list';
import NavHeader from './nav-header';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';

const NavContent = () => {
  const treeData = {
    rootId: 'docs',
    items: pageInfo.docs
      ? arrayToTreeItems(pageInfo.docs, {
          parentId: 'docs',
          parentTitle: 'Docs',
        })
      : {},
  };

  return (
    <>
      <NavHeader headerText="Docs" url="/docs" />
      <MenuSection id="docs-section" parentId="index-section">
        {/* TODO: TSFix nav typing */}
        {({ className }: { className: string }) => (
          <div className={className}>
            {/* TODO: Hiding for the time being */}
            {/* <BackItem text="Back to home" href="/" component={LinkComponent} /> */}
            {/* <Separator /> */}
            <TreeNavContent treeData={treeData} />
          </div>
        )}
      </MenuSection>
    </>
  );
};

export default NavContent;
