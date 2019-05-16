import React from 'react';
import Wrapper from '../../../src/components/page-templates/item-list';

export default () => (
  <Wrapper
    data={{
      key: 'guides',
      id: 'sub-guides',
      children: [{ id: 'guide-2', pagePath: 'sub-guides/guide-2' }],
      pageTitle: 'Documents',
      pageType: 'docs',
    }}
  />
);
