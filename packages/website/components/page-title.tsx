import * as React from 'react';
import Head from 'next/head';
import Meta from './meta-context';

export type Props = {
  title?: string;
};

const PageTitle = ({ title }: Props) => (
  <Meta.Consumer>
    {({ siteName }: { siteName: string }) => (
      <Head>
        <title>{title ? `${siteName} - ${title}` : siteName}</title>
      </Head>
    )}
  </Meta.Consumer>
);

export default PageTitle;
