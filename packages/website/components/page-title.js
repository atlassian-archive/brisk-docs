import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Meta from './meta-context';

const PageTitle = ({ title }) => (
  <Meta.Consumer>
    {({ siteName }) => (
      <Head>
        <title>{title ? `${siteName} - ${title}` : siteName}</title>
      </Head>
    )}
  </Meta.Consumer>
);

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
