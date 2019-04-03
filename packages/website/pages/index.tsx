import * as React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import { colors, math, gridSize } from '@atlaskit/theme';
import WidthDetector from '@atlaskit/width-detector';

import { Section } from '../components/page';
import Panel, { PanelGrid } from '../components/panel';
import Meta from '../components/meta-context';

const WINDOW_BREAKPOINT = 800;

throw new Error('borked');

const Page = styled.div`
  background-color: ${colors.B500};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
`;

const Heading = styled.h1`
  color: white;
  font-size: 52px;
  margin-top: ${math.multiply(gridSize, 10)}px !important;
  text-align: center;
`;

class HomePage extends React.Component {
  state = {
    displayAsColumn: false,
  };

  debouncedDetect = debounce(width => {
    if (width <= WINDOW_BREAKPOINT) {
      this.setState({ displayAsColumn: true });
    } else {
      this.setState({ displayAsColumn: false });
    }
  }, 100);

  packagesPanelProps = {
    IconComponent: PackagesIcon,
    label: 'Packages',
    color: colors.R400,
    description: 'Check out Jira Frontend packages and example usage guides.',
    imgSrc: '/static/code.png',
  };

  docsPanelProps = {
    IconComponent: MediaDocIcon,
    label: 'Documentation',
    color: colors.Y400,
    description:
      'Explore documentation about patterns, rules, and how to get started in Jira Frontend.',
    imgSrc: '/static/file_cabinet.png',
  };

  render() {
    const { displayAsColumn } = this.state;
    return (
      <WidthDetector onResize={this.debouncedDetect}>
        {() => (
          <Page>
            <Meta.Consumer>
              {context => <Heading>{context.siteName}</Heading>}
            </Meta.Consumer>

            <Section>
              <PanelGrid displayAsColumn={displayAsColumn}>
                <Panel href="/packages" {...this.packagesPanelProps} />
                <Panel href="/docs" {...this.docsPanelProps} />
              </PanelGrid>
            </Section>
          </Page>
        )}
      </WidthDetector>
    );
  }
}

export default HomePage;
