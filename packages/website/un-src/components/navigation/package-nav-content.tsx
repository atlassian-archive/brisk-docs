import * as React from 'react';

import { MenuSection, Separator, Group } from '@atlaskit/navigation-next';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import pageInfo from '../../pages-list';
import NavHeader from './nav-header';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';
import { NestedExamplePage, ExamplePage, DocsPage } from '../../../types';

const GetLink = ({ id, pagePath }: ExamplePage) => (
  <LinkWithRouter key={id} text={titleCase(id)} href={pagePath} />
);

const renderSubExamplesTree = (subExamples: NestedExamplePage[]) => {
  const treeData = {
    rootId: 'subExamples',
    items: arrayToTreeItems(subExamples, {
      parentId: 'subExamples',
      parentTitle: 'Sub Examples',
    }),
  };
  return (
    <>
      <Separator />
      <Group heading="Sub Examples" id="sub-group">
        <TreeNavContent treeData={treeData} />
      </Group>
    </>
  );
};

export type SomeProps = {
  homePath: string;
  packageName: string;
  changelogPath: string;
  docs: DocsPage[];
  examples: ExamplePage[];
  subExamples: NestedExamplePage[];
};

const NavContent = ({
  packageName,
  homePath,
  changelogPath,
  docs,
  examples,
  subExamples,
}: SomeProps) => {
  const treeData = {
    rootId: packageName,
    items: docs
      ? arrayToTreeItems(docs, {
          parentId: packageName,
          parentTitle: packageName,
        })
      : {},
  };

  return (
    <>
      <NavHeader headerText={packageName} url="/packages" />
      <MenuSection id="package-section" parentId="index-section">
        {({ className }: { className: string }) => (
          <div className={className}>
            <LinkWithRouter text="Home" href={homePath} />
            <Separator />
            {changelogPath && (
              <>
                <LinkWithRouter text="Changelog" href={changelogPath} />
                <Separator />
              </>
            )}
            <Group heading="Docs" id="docs-group" hasSeparator>
              <TreeNavContent treeData={treeData} />
            </Group>
            <Group heading="Examples" id="examples-group">
              {examples.map(GetLink)}
            </Group>
            {subExamples && subExamples.length > 0
              ? renderSubExamplesTree(subExamples)
              : null}
          </div>
        )}
      </MenuSection>
    </>
  );
};

const PackageNavContent = ({
  packageId,
  packageName,
}: {
  packageId: string;
  packageName: string;
}) => {
  const packagePages = pageInfo.packages.find(
    pkg => pkg.packageId === packageId,
  );

  if (!packagePages) {
    console.error(
      'the nav is about to render due to being unable to find',
      packageId,
      packageName,
    );
    return null;
  }

  return (
    <NavContent
      packageName={packageName}
      homePath={packagePages.homePath}
      changelogPath={packagePages.changelogPath}
      docs={packagePages.docs}
      examples={packagePages.examples}
      subExamples={packagePages.subExamples}
    />
  );
};

export default PackageNavContent;
