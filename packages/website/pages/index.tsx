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
interface DocumentObject {
  docsPath: string;
  name: string;
  description?: string;
  urlPath: string;
}
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

  getReadmePanelProps = () => {
    return {
      IconComponent: MediaDocIcon,
      label: 'Get Started',
      color: colors.R400,
      description: 'Everything you need to get up and running',
      imgSrc: '/static/code.png',
    };
  };

  getPackagesPanelProps = (desc: string) => {
    return {
      IconComponent: PackagesIcon,
      label: 'Packages',
      color: colors.R400,
      description: desc,
      imgSrc: '/static/code.png',
    };
  };

  getDocsPanelProps = (doc: DocumentObject) => {
    return {
      href: doc.urlPath,
      IconComponent: MediaDocIcon,
      label: doc.name,
      color: colors.Y400,
      description: doc.description || '',
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
                      {Object.keys(pageInfo).find(x => x === 'readme') && (
                        <Panel href="/readme" {...this.getReadmePanelProps()} />
                      )}
                      <Panel
                        href="/packages"
                        {...this.getPackagesPanelProps(
                          context.packagesDescription,
                        )}
                      />
                      {Object.keys(pageInfo)
                        .slice(1)
                        .filter(x => x !== 'readme')
                        .map((key, i) => (
                          <Panel
                            key={key}
                            {...this.getDocsPanelProps(context[i])}
                          />
                        ))}
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
