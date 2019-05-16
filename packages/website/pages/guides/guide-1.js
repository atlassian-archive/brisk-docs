import React from 'react';
import Component from '../../../../guides/guide-1.md';
import Wrapper from '../../src/components/page-templates/project-docs';

export default () => (
  <Wrapper data={{ key: 'guides', pageTitle: 'Guide 1' }}>
    <Component />
  </Wrapper>
);
