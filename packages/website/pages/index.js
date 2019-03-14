/* eslint-disable no-undef */
// TODO: Disabling ESlint for this file to prevent error of window being undefined
// TODO: Re-enable after AFP-176 is complete
import * as React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import { colors, math, gridSize } from '@atlaskit/theme';

import { Section } from '../components/page';
import Panel, { PanelGrid } from '../components/panel';

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

const SubHeading = styled.h3`
  color: white;
  max-width: 800px;
  margin: 28px auto;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`;

class HomePage extends React.Component {
  state = {
    displayAsColumn: false,
  };

  componentDidMount() {
    this.debouncedDetect = debounce(() => {
      const width = window.innerWidth;
      if (width <= WINDOW_BREAKPOINT) {
        this.setState({ displayAsColumn: true });
      } else {
        this.setState({ displayAsColumn: false });
      }
    }, 500);
    window.addEventListener('resize', this.debouncedDetect);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedDetect);
  }

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
      <Page>
        <Heading>Jira Frontend Documentation</Heading>
        <SubHeading>
          This is the home of documentation for Jira Frontend packages and
          relevant usage guidelines.
        </SubHeading>
        <Section>
          <PanelGrid displayAsColumn={displayAsColumn}>
            <Panel href="/packages" {...this.packagesPanelProps} />
            <Panel href="/docs" {...this.docsPanelProps} />
          </PanelGrid>
        </Section>
      </Page>
    );
  }
}

export default HomePage;
