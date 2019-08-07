import React from 'react';
import Head from 'next/head';
import Meta from './meta-context';

export type Props = {
  title?: string;
};

const PageTitle = ({ title }: Props) => (
  <Meta.Consumer>
    {({ siteName }: { siteName: string }) => (
      <Head>
        <title>{title ? `${title} - ${siteName}` : siteName}</title>
      </Head>
    )}
  </Meta.Consumer>
);

export default PageTitle;
