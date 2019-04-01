import * as React from 'react';

import {
  MenuSection,
  BackItem,
  Separator,
  Group,
} from '@atlaskit/navigation-next';

import * as PropTypes from 'prop-types';
import titleCase from 'title-case';
import LinkWithRouter from './link-with-router';
import LinkComponent from './link-component';
import pageInfo from '../../pages-list';
import NavHeader from './nav-header';
import TreeNavContent, { arrayToTreeItems } from './tree-nav-content';
import { Page } from '../../types';

type LinkProps = { id: string; pagePath; string };

const GetLink = ({ id, pagePath }: LinkProps) => (
  <LinkWithRouter key={id} text={titleCase(id)} href={pagePath} />
);

type SubExamples = Array<{
  id: string;
  pagePath: string;
  isolatedPath: string;
}>;

const renderSubExamplesTree = (subExamples: SubExamples) => {
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
  docs: Array<Page>;
  examples: Array<Page>;
  subExamples: SubExamples;
};

// subExamples: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     pagePath: PropTypes.string,
//     isolatedPath: PropTypes.string,
//   }),
// ),
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
      {({ className }) => (
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

const PackageNavContent = ({ packageId, packageName }) => {
  const packagePages = pageInfo.packages.find(
    pkg => pkg.packageId === packageId,
  );

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

PackageNavContent.propTypes = {
  packageId: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
};

export default PackageNavContent;
