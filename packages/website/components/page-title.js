import Head from 'next/head';
import PropTypes from 'prop-types';

const PageTitle = props => (
  <Head>
    <title>Brisk Document - {props.title}</title>
  </Head>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
