import * as React from 'react';

import {
  MenuSection,
  BackItem,
  Separator,
  Group,
} from '@atlaskit/navigation-next';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import LinkComponent from './link-component';
import pageInfo from '../../pages-list';
import NavHeader from './nav-header';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';
import { Pages, NestedExamples, ExamplePage, Page } from '../../types';

const GetLink = ({ id, pagePath }: Page | ExamplePage) => (
  <LinkWithRouter key={id} text={titleCase(id)} href={pagePath} />
);

const renderSubExamplesTree = (subExamples: NestedExamples[]) => {
  const treeData = {
    rootId: 'subExamples',
    items: arrayToTreeItems(subExamples, {
      parentId: 'subExamples',
      parentTitle: 'sub examples',
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
  docs: Pages;
  examples: ExamplePage[];
  subExamples: NestedExamples[];
};

const NavContent = ({
  packageName,
  homePath,
  changelogPath,
  docs,
  examples,
  subExamples,
}: SomeProps) => (
  <>
    <NavHeader headerText={packageName} />
    <MenuSection id="package-section" parentId="index-section">
      {({ className }: { className: string }) => (
        <div className={className}>
          <BackItem
            text="Back to packages"
            href="/packages"
            component={LinkComponent}
          />
          <Separator />
          <LinkWithRouter text="Home" href={homePath} />
          <Separator />
          {changelogPath && (
            <>
              <LinkWithRouter text="Changelog" href={changelogPath} />
              <Separator />
            </>
          )}
          <Group heading="Docs" id="docs-group" hasSeparator>
            {docs.map(GetLink)}
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
