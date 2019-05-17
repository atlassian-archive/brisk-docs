/* eslint-disable react/no-danger */
// Disable eslint warning for green build
// TODO: Investigate alternatives to dangerouslySetInnerHTML property
import React from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';

import { colors, gridSize, math } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import WidthDetector from '@atlaskit/width-detector';
import ChevronLeftCircleIcon from '@atlaskit/icon/glyph/chevron-left-circle';
import ChevronRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import * as PropTypes from 'prop-types';

import LinkButton from '../link-button';
import PackageNavContent from '../navigation/package-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import PageTitle from '../page-title';
import CodeView from '../code-example/code-view';

const PageContent = styled.div`
  display: flex;
  margin: 0;
`;

const ExampleStyle = styled.div`
  display: grid;
  grid-template-columns:
    [left-pad-start] 32px
    [left-pad-end example-start] 1fr
    [example-end right-pad-start] 32px
    [right-pad-end];

  grid-template-rows:
    [header-top] auto
    [header-bottom example-top] 1fr
    [example-bottom];

  grid-template-areas:
    '. header .'
    '. example .';

  // flex-direction: column;
  // align-items: center;
  box-sizing: border-box;
  padding: ${math.multiply(gridSize, 2)}px;
  padding-top: 0;
  height: 100vh;
  left: 0;
  overflow-x: auto;
  overflow-y: scroll;
`;

const ExampleComponentContainer = styled.div`
  grid-area: example;
  background-color: white;
  border: 1px solid black;
  border-radius: ${gridSize}px;
  padding: ${math.multiply(gridSize, 2)}px;
  padding-top: ${math.multiply(gridSize, 3)}px;
  margin: ${math.multiply(gridSize, 4)}px 0px;
  min-width: ${math.multiply(gridSize, 60)}px;
`;

const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: ${math.multiply(gridSize, 3)}px 0;
  margin-top: ${gridSize}px;
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

const CodeViewButton = ({ isCodeViewExpanded, handleClick }) => (
  <div
    style={{ position: 'absolute', right: '0', top: '100px', zIndex: '500' }}
  >
    <Button hitAreaSize="small" onClick={handleClick}>
      {isCodeViewExpanded ? (
        <ChevronRightCircleIcon
          label="collapse"
          primaryColor={colors.B200}
          size="large"
        />
      ) : (
        <ChevronLeftCircleIcon
          label="expand"
          primaryColor={colors.B200}
          size="large"
        />
      )}
    </Button>
  </div>
);

CodeViewButton.propTypes = {
  isCodeViewExpanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

class PackageExample extends React.Component {
  state = {
    showCodeViewButton: true,
    isCodeViewExpanded: true,
    shouldExpandCodeWithWideWindow: true,
  };

  handleClick = () => {
    this.setState(state => ({
      isCodeViewExpanded: !state.isCodeViewExpanded,
      shouldExpandCodeWithWideWindow: !state.shouldExpandCodeWithWideWindow,
    }));
  };

  handleResize = debounce(
    width => {
      const { isCodeViewExpanded } = this.state;

      if (width < 600) {
        this.setState({
          showCodeViewButton: false,
          isCodeViewExpanded: false,
        });
      } else if (width < 1200 && !isCodeViewExpanded) {
        this.setState({
          showCodeViewButton: false,
        });
      } else if (width >= 1200) {
        this.setState(state => ({
          showCodeViewButton: true,
          isCodeViewExpanded: state.shouldExpandCodeWithWideWindow,
        }));
      }
    },
    100,
    { leading: false },
  );

  render() {
    const { showCodeViewButton, isCodeViewExpanded } = this.state;
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
            <WidthDetector onResize={this.handleResize}>
              {() => (
                <ExampleStyle>
                  <Header>
                    <Heading>{data.pageTitle}</Heading>
                    <LinkButton href={data.isolatedPath}>
                      Full page view
                    </LinkButton>
                  </Header>
                  {children.map(child => (
                    <ExampleComponentContainer key={child.name}>
                      {child.name !== 'default' && (
                        <ExampleHeading>{child.name}</ExampleHeading>
                      )}
                      {child.component}
                    </ExampleComponentContainer>
                  ))}
                  {showCodeViewButton && (
                    <CodeViewButton
                      isCodeViewExpanded={isCodeViewExpanded}
                      handleClick={this.handleClick}
                    />
                  )}
                </ExampleStyle>
              )}
            </WidthDetector>
            {showCodeViewButton && (
              <CodeView
                isExpanded={isCodeViewExpanded}
                fileContents={fileContents}
              />
            )}
          </PageContent>
        </NavigationWrapper>
      </>
    );
  }
}

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
