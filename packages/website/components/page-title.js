import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => (
  <Head>
    <title>Brisk Document - {title}</title>
  </Head>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
