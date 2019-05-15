import React from 'react';
import titleCase from 'title-case';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import styled from '@emotion/styled';
import { gridSize, math } from '@atlaskit/theme';

const Header = styled.div`
  left: 0;
  right: 0;
  padding: ${math.multiply(gridSize, 4)}px ${math.multiply(gridSize, 5)}px;
  padding-bottom: ${math.multiply(gridSize, 1.5)}px;
`;

type BreadcrumbsNavProps = {
  pagePath: string;
};

const BreadcrumbsNav = ({ pagePath }: BreadcrumbsNavProps) => {
  const pgPath = pagePath.replace('/index.js', '').replace('.js', '');
  const pages = pgPath.split('/');
  pages.pop(); // Don't display the current (i.e. last) page in the breadcrumbs

  const pagePaths: string[] = [];
  pages.reduce((acc: string, page: string, idx: number) => {
    pagePaths[idx] = `${acc}/${page}`;
    return pagePaths[idx];
  }, '');

  return (
    <Header>
      <Breadcrumbs>
        {pagePaths.map((path, idx) => (
          <BreadcrumbsItem href={path} text={titleCase(pages[idx])} />
        ))}
      </Breadcrumbs>
    </Header>
  );
};

export const isPathRoot = (pagePath: string) => {
  const pages = pagePath.split('/').filter(a => a);
  return pages.length === 1;
};

export default BreadcrumbsNav;
