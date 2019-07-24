import React, { ReactNode } from 'react';
// @ts-ignore
import Table from '@atlaskit/dynamic-table';
import styled from '@emotion/styled';
// @ts-ignore
import { gridSize } from '@atlaskit/theme';
import titleCase from 'title-case';

import NavigationWrapper from '../navigation-wrapper';
import PackageNavContent from '../navigation/package-nav-content';
import DocsNavContent from '../navigation/docs-nav-content';
import PageComponent, { Title, Section } from '../page';
import pageInfo from '../../pages-list';
import PageTitle from '../page-title';
import Breadcrumbs, { isPathRoot } from '../breadcrumbs';
import Link from '../switch-link';
import { getTitle } from '../../model/page';
import { DocsPage, Page } from '../../../types';

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 20,
    },
    {
      key: 'url',
      content: 'Url',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
  ],
};

const renderRow = (item: Page) => ({
  cells: [
    {
      key: item.id,
      content: <RowCell>{getTitle(item)}</RowCell>,
    },
    {
      key: item.id,
      content: (
        <RowCell>
          {/*
            TODO: Fix this nonsense - 
            Currently pagePath is neither an absolute nor a proper relative path, meaning things get wacky
            Here we are making it an actual relative path, but ideally this would be absolute like the root
            ones. This intermediate neither state is right out.
          */}
          <Link
            href={
              item.pagePath.match(/^\//) ? item.pagePath : `./${item.pagePath}`
            }
          >
            {() => item.id}
          </Link>
        </RowCell>
      ),
    },
  ],
});

// Tabular data
const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;

type Row = {
  cells: Array<{
    key: string;
    content: ReactNode;
  }>;
};

// TODO: There's actually two possible shapes here but they can't be typed correctly without refactoring.
// Either an id + packageName are passed in, or an id + key + children. Items-list is doing too many things
// here and should be refactored to only have one method of data retrieval. Either always retrieving from
// page-list (packageName) or being provided the data up front (children). The latter seems preferable.
type Props = {
  data: {
    id: string;
    key?: string;
    packageName?: string;
    pagePath: string;
    pageType: 'docs' | 'examples';
    pageTitle?: string;
    children?: DocsPage[];
  };
};

const ItemList = ({ data }: Props) => {
  const getRows = (): Row[] => {
    if (data.children) {
      return data.children.map(child => renderRow(child));
    }

    const packagePages = pageInfo.packages.find(
      pkg => pkg.packageId === data.id,
    );
    if (!packagePages) {
      console.error(`Could not find package'${data.id}`);
      return [];
    }

    // Assert as any since union array types aren't callable
    // https://github.com/Microsoft/TypeScript/pull/29011#issuecomment-451212987
    return (packagePages[data.pageType] as any).map((item: Page) =>
      renderRow(item),
    );
  };
  const getDocsList = () => {
    let title = titleCase(data.id);
    if (data.packageName) {
      title =
        data.pageType === 'docs' ? 'Document Home Page' : 'Example Home Page';
    }

    return (
      <PageComponent>
        <Title>{title}</Title>
        <Section>
          <Table head={head} rows={getRows()} />
        </Section>
      </PageComponent>
    );
  };

  return (
    <>
      <PageTitle title={data.pageTitle} />
      <NavigationWrapper
        navContent={() =>
          data.packageName ? (
            <PackageNavContent
              packageId={data.id}
              packageName={data.packageName}
            />
          ) : (
            // FIXME: See props for explanation of this implicit behaviour
            <DocsNavContent docId={data.key as string} />
          )
        }
      >
        {!isPathRoot(data.pagePath) && (
          <div style={{ marginBottom: '-2rem' }}>
            <Breadcrumbs pagePath={data.pagePath} />
          </div>
        )}
        {getDocsList()}
      </NavigationWrapper>
    </>
  );
};

export default ItemList;
