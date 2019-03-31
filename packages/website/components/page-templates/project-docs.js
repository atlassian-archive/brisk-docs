import React from 'react';
import * as PropTypes from 'prop-types';

import DocsNavContent from '../navigation/docs-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import Wrapper from '../content-style-wrapper';
import PageTitle from '../page-title';

const ProjectDocsWrapper = ({ children }) => (
  <>
    <PageTitle />
    <NavigationWrapper navContent={DocsNavContent}>
      <Wrapper>{children}</Wrapper>
    </NavigationWrapper>
  </>
);

ProjectDocsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectDocsWrapper;
