import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';

import NavigationWrapper from '../components/navigation-wrapper';
import data from '../pages-list';

export default class Home extends Component {
  static propTypes = {
    packageName: PropTypes.string.isRequired,
  };

  static getInitialProps({ query: { name } }) {
    return { packageName: name };
  }

  render() {
    const { packageName } = this.props;

    return (
      <NavigationWrapper menuItems={data.data} subItem>
        <h1> This is the {packageName} home page</h1>
        <br />
        <br />
        <Button appearance="primary"> AtlasButton </Button>
      </NavigationWrapper>
    );
  }
}
