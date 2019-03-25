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

const GetLink = ({ id, pagePath }) => (
  <LinkWithRouter key={id} text={titleCase(id)} href={pagePath} />
);

GetLink.propTypes = {
  id: PropTypes.string.isRequired,
  pagePath: PropTypes.string.isRequired,
};

const NavContent = ({
  packageName,
  homePath,
  changelogPath,
  docs,
  examples,
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
          <LinkWithRouter text="Changelog" href={changelogPath} />
          <Separator />
          <Group heading="Docs" id="docs-group" hasSeparator>
            {docs.map(GetLink)}
          </Group>
          <Group heading="Examples" id="examples-group">
            {examples.map(GetLink)}
          </Group>
        </div>
      )}
    </MenuSection>
  </>
);

NavContent.propTypes = {
  homePath: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
  changelogPath: PropTypes.string.isRequired,
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
    />
  );
};

PackageNavContent.propTypes = {
  packageId: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
};

export default PackageNavContent;
