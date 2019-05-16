import React from 'react';
import * as PropTypes from 'prop-types';

import DocsNavContent from '../navigation/docs-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import Wrapper from '../content-style-wrapper';
import PageTitle from '../page-title';

const ProjectDocsWrapper = ({ children, data }) => (
  <>
    <PageTitle title={data.pageTitle} />
    <NavigationWrapper navContent={() => <DocsNavContent docId={data.key} />}>
      <Wrapper>{children}</Wrapper>
    </NavigationWrapper>
  </>
);

ProjectDocsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    key: PropTypes.string,
    pageTitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectDocsWrapper;
