import * as React from 'react';
import Table from '@atlaskit/dynamic-table';

import styled from 'styled-components';
import Link from 'next/link';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import titleCase from 'title-case';

import Page, { Title, Section } from '../components/page';
import NavigationWrapper from '../components/navigation-wrapper';
import AllPackagesNavContent from '../components/navigation/all-packages-nav-content';

import data from '../pages-list';
// eslint-disable-next-line import/no-unresolved
import meta from '../data/packages-data.json';
import PageTitle from '../components/page-title';

import { PackageInfo } from '../types';

const gridSize = gridSizeFn();

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 20,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'version',
      content: 'Version',
      shouldTruncate: true,
      isSortable: false,
      width: 15,
    },
    {
      key: 'maintainers',
      content: 'Maintainers',
      shouldTruncate: true,
      isSortable: false,
      width: 40,
    },
  ],
};

type Item = {
  packageId: string;
  homePath: string;
};

const renderRow = ({ packageId, homePath }: Item) => {
  const metaData = meta.metaData.find((x: PackageInfo) => x.id === packageId);
  return {
    cells: [
      {
        key: packageId,
        content: (
          <RowCell>
            <Link href={homePath}>
              <a>{titleCase(packageId)}</a>
            </Link>
          </RowCell>
        ),
      },
      {
        key: 'description',
        content: <RowCell>{metaData.description}</RowCell>,
      },
      {
        key: 'version',
        shouldTruncate: true,
        content: <RowCell>{metaData.version}</RowCell>,
      },
      {
        key: 'maintainers',
        content: (
          <RowCell>
            {metaData.maintainers && metaData.maintainers.length > 0
              ? metaData.maintainers.join(', ')
              : ''}
          </RowCell>
        ),
      },
    ],
  };
};

const GetRows = () => data.packages.map((item: Item) => renderRow(item));

const PackagesList = () => (
  <Page>
    <Title>Brisk Documentation</Title>
    <Section>
      <Table
        head={head}
        rows={GetRows()}
        defaultSortKey="name"
        defaultSortOrder="ASC"
      />
    </Section>
  </Page>
);

// Tabular data
const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;

const Index = () => (
  <>
    <PageTitle title="Packages" />
    <NavigationWrapper
      navContent={() => <AllPackagesNavContent data={data.packages} />}
    >
      <PackagesList />
    </NavigationWrapper>
  </>
);
export default Index;
