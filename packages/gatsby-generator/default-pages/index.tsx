import * as React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import LinkIcon from '@atlaskit/icon/glyph/link';
import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { colors, math, gridSize } from '@atlaskit/theme';
import WidthDetector from '@atlaskit/width-detector';

import { Section } from '../un-src/components/page';
import Panel, { PanelGrid } from '../un-src/components/panel';
import Meta, {
  LinkObject,
  DocumentObject,
  ReadMeObject,
  PackagesObject,
} from '../un-src/components/meta-context';

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

  getReadmePanelProps = ({ imgSrc }: ReadMeObject) => {
    return {
      href: '/readme',
      IconComponent: MediaDocIcon,
      label: 'Get Started',
      color: colors.R400,
      description: 'Everything you need to get up and running',
      imgSrc: imgSrc || '/code.png',
    };
  };

  getPackagesPanelProps = ({ description, imgSrc }: PackagesObject) => {
    return {
      href: '/packages',
      IconComponent: PackagesIcon,
      label: 'Packages',
      color: colors.R400,
      description,
      imgSrc: imgSrc || '/code.png',
    };
  };

  getDocsPanelProps = (doc: DocumentObject) => {
    return {
      href: `/${doc.urlPath}`,
      IconComponent: MediaDocIcon,
      label: doc.name,
      color: colors.Y400,
      description: doc.description || '',
      imgSrc: doc.imgSrc || '/file_cabinet.png',
    };
  };

  getLinkPanelProps = (link: LinkObject) => {
    return {
      href: link.href,
      label: link.label,
      description: link.description || '',
      ExternalIconComponent: ShortcutIcon,
      IconComponent: LinkIcon,
      color: colors.N400,
      imgSrc: link.imgSrc || '/simplify.svg',
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
                      {context.readMe && (
                        <Panel {...this.getReadmePanelProps(context.readMe)} />
                      )}
                      <Panel
                        {...this.getPackagesPanelProps(context.packages)}
                      />
                      {context.docs.map(doc => (
                        <Panel
                          key={doc.name}
                          {...this.getDocsPanelProps(doc)}
                        />
                      ))}
                      {context.links.map((link, idx) => (
                        // generic links don't have a good key
                        // eslint-disable-next-line react/no-array-index-key
                        <Panel key={idx} {...this.getLinkPanelProps(link)} />
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
