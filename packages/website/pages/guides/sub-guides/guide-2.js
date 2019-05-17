import React from 'react';
import Component from '../../../../../guides/sub-guides/guide-2.md';
import Wrapper from '../../../src/components/page-templates/project-docs';

export default () => (
  <Wrapper data={{ key: 'guides', pageTitle: 'Guide 2' }}>
    <Component />
  </Wrapper>
);
