import * as React from 'react';
import { BackItem, MenuSection, Separator } from '@atlaskit/navigation-next';
import pageInfo from '../../pages-list';
import LinkComponent from './link-component';
import NavHeader from './nav-header';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';

const NavContent = ({ docId }: { docId: string }) => {
  const treeData = {
    rootId: docId,
    items: pageInfo[docId]
      ? arrayToTreeItems(pageInfo[docId], {
          parentId: docId,
          parentTitle: docId,
        })
      : {},
  };

  return (
    <>
      <NavHeader headerText={docId} />
      <MenuSection id="docs-section" parentId="index-section">
        {/* TODO: TSFix nav typing */}
        {({ className }: { className: string }) => (
          <div className={className}>
            <BackItem text="Back to home" href="/" component={LinkComponent} />
            <Separator />
            <TreeNavContent treeData={treeData} />
          </div>
        )}
      </MenuSection>
    </>
  );
};

export default NavContent;
