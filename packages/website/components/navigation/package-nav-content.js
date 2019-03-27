import React from 'react';

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

const GetLink = ({ id, pagePath }) => (
  <LinkWithRouter key={id} text={titleCase(id)} href={pagePath} />
);

GetLink.propTypes = {
  id: PropTypes.string.isRequired,
  pagePath: PropTypes.string.isRequired,
};

const renderSubExamplesTree = subExamples => {
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

const NavContent = ({
  packageName,
  homePath,
  changelogPath,
  docs,
  examples,
  subExamples,
}) => (
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

NavContent.propTypes = {
  homePath: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
  changelogPath: PropTypes.string,
  docs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pagePath: PropTypes.string.isRequired,
    }),
  ).isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pagePath: PropTypes.string.isRequired,
    }),
  ).isRequired,
  subExamples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pagePath: PropTypes.string,
      isolatedPath: PropTypes.string,
    }),
  ),
};

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
