import * as React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import { colors, math, gridSize } from '@atlaskit/theme';
import WidthDetector from '@atlaskit/width-detector';

import { Section } from '../src/components/page';
import Panel, { PanelGrid } from '../src/components/panel';
import Meta from '../src/components/meta-context';
import pageInfo from '../src/pages-list';

const WINDOW_BREAKPOINT = 800;

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

  getPackagesPanelProps = (desc: string) => {
    return {
      IconComponent: PackagesIcon,
      label: 'Packages',
      color: colors.R400,
      description: desc,
      imgSrc: '/static/code.png',
    };
  };

  getDocsPanelProps = (desc?: string) => {
    return {
      IconComponent: MediaDocIcon,
      label: 'Documentation',
      color: colors.Y400,
      description: desc || '',
      imgSrc: '/static/file_cabinet.png',
    };
  };

  render() {
    const { displayAsColumn } = this.state;
    return (
      <WidthDetector onResize={this.debouncedDetect}>
        {() => (
          <Page>
            <Meta.Consumer>
              {context => (
                <>
                  <Heading>{context.siteName}</Heading>
                  <Section>
                    <PanelGrid displayAsColumn={displayAsColumn}>
                      <Panel
                        href="/packages"
                        {...this.getPackagesPanelProps(
                          context.packagesDescription,
                        )}
                      />
                      {pageInfo.docs && (
                        <Panel
                          href="/docs"
                          {...this.getDocsPanelProps(context.description)}
                        />
                      )}
                    </PanelGrid>
                  </Section>
                </>
              )}
            </Meta.Consumer>
          </Page>
        )}
      </WidthDetector>
    );
  }
}

export default HomePage;
