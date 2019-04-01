import * as React from 'react';
import Button from '@atlaskit/button';

import NavigationWrapper from '../components/navigation-wrapper';
import data from '../pages-list';

export type Props = {
  packageName: string;
};

export default class Home extends React.Component<Props> {
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
