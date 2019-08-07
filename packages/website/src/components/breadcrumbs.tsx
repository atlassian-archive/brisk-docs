/* eslint-disable react/no-multi-comp */
import React from 'react';
import titleCase from 'title-case';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import styled from '@emotion/styled';
import { gridSize, math } from '@atlaskit/theme';
import { NavLink } from 'react-router-dom';

const Header = styled.div`
  left: 0;
  right: 0;
  padding: ${math.multiply(gridSize, 4)}px ${math.multiply(gridSize, 5)}px;
  padding-bottom: ${math.multiply(gridSize, 1.5)}px;
`;

type NextLinkProps = {
  href: string;
  className: string;
  children: React.ReactNode;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
};

const NextLink = React.forwardRef(
  (
    { href, className, onMouseEnter, onMouseLeave, children }: NextLinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    return (
      <NavLink to={href}>
        <a
          ref={ref}
          className={className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </a>
      </NavLink>
    );
  },
);

type BreadcrumbsNavProps = {
  pagePath: string;
};

const BreadcrumbsNav = ({ pagePath }: BreadcrumbsNavProps) => {
  const pgPath = pagePath.replace('/index.js', '').replace('.js', '');
  const pages = pgPath.split('/').filter(a => a);

  const pagePaths: string[] = [];
  pages.reduce((acc: string, page: string, idx: number) => {
    pagePaths[idx] = `${acc}/${page}`;
    return pagePaths[idx];
  }, '');

  return (
    <Header>
      <Breadcrumbs>
        {pagePaths.map((path, idx) =>
          idx === pagePaths.length - 1 ? (
            <BreadcrumbsItem
              key={pages[idx]}
              href={path}
              text={titleCase(pages[idx])}
              component={React.forwardRef(() => (
                <p style={{ fontWeight: 'bold' }}>{titleCase(pages[idx])}</p>
              ))}
            />
          ) : (
            <BreadcrumbsItem
              key={pages[idx]}
              href={path}
              text={titleCase(pages[idx])}
              component={NextLink}
            />
          ),
        )}
      </Breadcrumbs>
    </Header>
  );
};

// TODO: Don't expose this here as it creates a circular dependency
// Either, internalise this, expose as a prop or extract into separate module
export const isPathRoot = (pagePath: string) => {
  const pages = pagePath.split('/').filter(a => a);
  return pages.length === 1;
};

export default BreadcrumbsNav;
