import * as React from 'react';
import { Helmet } from 'react-helmet';
import Meta from './meta-context';

export type Props = {
  title?: string;
};

const PageTitle = ({ title }: Props) => (
  <Meta.Consumer>
    {({ siteName }: { siteName: string }) => (
      <Helmet>
        <title>{title ? `${title} - ${siteName}` : siteName}</title>
      </Helmet>
    )}
  </Meta.Consumer>
);

export default PageTitle;
