import React from 'react';
import styled from '@emotion/styled';
// @ts-ignore
import { math, gridSize } from '@atlaskit/theme';

import Breadcrumbs, { isPathRoot } from './breadcrumbs';

const Padding = styled.div`
  max-width: ${math.multiply(gridSize, 130)}px;
  padding: 0 ${math.multiply(gridSize, 5)}px;
  margin: ${math.multiply(gridSize, 5)}px auto;
  margin-top: 0;
`;

type ContentWrapperProps = {
  pagePath?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({ pagePath, children }: ContentWrapperProps) => (
  <>
    {pagePath && !isPathRoot(pagePath) && <Breadcrumbs pagePath={pagePath} />}
    <Padding>{children}</Padding>
  </>
);

export default ContentWrapper;
