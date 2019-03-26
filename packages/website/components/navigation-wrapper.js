import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import SearchIcon from '@atlaskit/icon/glyph/search';
import {
  GlobalNav,
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';
import LinkComponent from './navigation/link-component';
import SearchDrawer from './navigation/search-drawer';

class NavigationWrapper extends Component {
  state = {
    showSearchDrawer: false,
  };

  render() {
    const { children, navContent } = this.props;
    const { showSearchDrawer } = this.state;
    // ToDo Cache is disabled for now to avoid the nav resize issue during SSR.
    return (
      <NavigationProvider cache={false}>
        <LayoutManager
          globalNavigation={() => (
            <GlobalNav
              primaryItems={[
                {
                  // There is an AK problem as the SSR doesn't match the run code. Hence removed JiraIcon
                  icon: () => (
                    <DocumentsIcon label="Brisk Docs" size="medium" />
                  ),
                  id: 'logo',
                  tooltip: 'Frontend docs home',
                  href: '/',
                  component: LinkComponent,
                },
                {
                  // TODO this throws a scary large error in the console as the SSR doesn't match the run code.
                  // This is an AK problem...
                  icon: () => <SearchIcon size="medium" />,
                  id: 'search',
                  tooltip: 'Search for documentation',
                  onClick: () => this.setState({ showSearchDrawer: true }),
                },
              ]}
              secondaryItems={[]}
            />
          )}
          productNavigation={() => null}
          containerNavigation={navContent}
        >
          {children}
          <SearchDrawer
            isOpen={showSearchDrawer}
            closeDrawer={() => this.setState({ showSearchDrawer: false })}
          />
        </LayoutManager>
      </NavigationProvider>
    );
  }
}

NavigationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  navContent: PropTypes.func.isRequired,
};

export default NavigationWrapper;
