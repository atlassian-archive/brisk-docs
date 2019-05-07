/* eslint-disable react/no-danger */
// Disable eslint warning for green build
// TODO: Investigate alternatives to dangerouslySetInnerHTML property
import React from 'react';
import styled  from '@emotion/styled';
import { keyframes } from '@emotion/core';
import prettier from 'prettier-standalone';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';


import { colors, gridSize, math, themed } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import WidthDetector from '@atlaskit/width-detector';
import ChevronRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import * as PropTypes from 'prop-types';

import LinkButton from '../link-button';
import PackageNavContent from '../navigation/package-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import PageTitle from '../page-title';
import ExampleSource from '../code-example/code-view';

const PageContent = styled.div`
  display: flex;
  top: 0;
  bottom: 0;
`;

const ExampleStyle = styled.div`
  flex-basis: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: ${math.multiply(gridSize, 2)}px;
  padding-top: 0;
  height: 100%;
  left: 0;
`;

const ExampleComponentContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: ${gridSize}px;
  padding: ${math.multiply(gridSize, 2)}px;
  padding-top: ${math.multiply(gridSize, 3)}px;
  margin: ${math.multiply(gridSize, 4)}px 0px;
  min-width: ${math.multiply(gridSize, 60)}px;
  max-width: ${math.multiply(gridSize, 80)}px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${math.multiply(gridSize, 3)}px 0;
  border-bottom-color: rgb(235, 236, 240);
  border-bottom-style: solid;
  border-bottom-width: ${math.multiply(gridSize, 0.25)}px;
`;

const Heading = styled.h1`
  margin-right: ${math.multiply(gridSize, 4)}px;
`;

const ExampleHeading = styled.h2`
  margin-bottom: ${math.multiply(gridSize, 4)}px;
`;


const CodeView = styled.div`
  box-sizing: border-box;
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  padding: 0;
  margin: 0;
  width: ${math.multiply(gridSize, 80)}px;
`;

// type Props = {
//   data: string,
//   fileContents: string,
//   children: React.ReactChild,
// };


class PackageExample extends React.Component {

  state = {
    isCodeViewExpanded: true,
  };

  handleClick = () => {
    this.setState(state => ({
      isCodeViewExpanded: !state.isCodeViewExpanded
    }), () => {
      console.log(this.state.isCodeViewExpanded)
    });
  };

  render() {
    const { isCodeViewExpanded } = this.state;
    const { data, fileContents, children } = this.props;

    return (
      <>
        <PageTitle title={data.pageTitle} />
        <NavigationWrapper
          navContent={() => (
            <PackageNavContent
              packageId={data.id}
              packageName={data.packageName}
            />
          )}
        >
          <PageContent>
            <WidthDetector>
              {() => (
                <ExampleStyle>
                  <Header>
                    <Heading>{data.pageTitle}</Heading>
                    <LinkButton href={data.isolatedPath}>Full page view</LinkButton>
                  </Header>
                  {children.map(child => (
                    <ExampleComponentContainer key={child.name}>
                      {child.name !== 'default' && (
                        <ExampleHeading>{child.name}</ExampleHeading>
                      )}
                      {child.component}
                    </ExampleComponentContainer>
                  ))}
                <div style={{ position: 'absolute', right: 0, top: '100px', zIndex: '500' }}>
                  <Button hitAreaSize="small" isVisible={false} hasHighlight={false} onClick={this.handleClick}>
                  <ChevronRightCircleIcon label="collapse" primaryColor={colors.B200} size="large"/>
                  </Button>
                </div>
                </ExampleStyle>
              )}
            </WidthDetector>
            <ExampleSource isExpanded={isCodeViewExpanded} fileContents={fileContents} />
          </PageContent>
        </NavigationWrapper>
      </>
    );
  }
};

// console.log(fileContents);
// const prettified = prettier.format(fileContents, { printWidth: 10 });
// console.log(prettified);


PackageExample.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    }),
  ).isRequired,
  fileContents: PropTypes.string.isRequired,
};

export default PackageExample;
