import * as React from 'react';
import { MenuSection } from '@atlaskit/navigation-next';
import pageInfo from '../../pages-list';
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
      <NavHeader headerText={docId} url={`/${docId.toLowerCase()}`} />
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
