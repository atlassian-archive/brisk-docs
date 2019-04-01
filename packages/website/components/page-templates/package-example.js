/* eslint-disable react/no-danger */
// Disable eslint warning for green build
// TODO: Investigate alternatives to dangerouslySetInnerHTML property
import React from 'react';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

import { colors, gridSize, math, themed } from '@atlaskit/theme';
import * as PropTypes from 'prop-types';

import LinkButton from '../link-button';
import PackageNavContent from '../navigation/package-nav-content';
import NavigationWrapper from '../navigation-wrapper';
import PageTitle from '../page-title';

const PageContent = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  padding-right: ${math.multiply(gridSize, 80)}px;
`;

const ExampleStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${math.multiply(gridSize, 80)}px;
  padding: ${math.multiply(gridSize, 2)}px;
  padding-top: 0;
  background-color: ${colors.N30};
  height: 100%;
`;

const ExampleComponentContainer = styled.div`
  background-color: white;
  border-radius: ${gridSize}px;
  padding: ${gridSize}px;
  padding-top: ${math.multiply(gridSize, 6)}px;
  margin-top: ${math.multiply(gridSize, 2)}px;

  .inner-container {
    background-color: 'white';
    border-radius: '4px';
    padding: '16px';
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${math.multiply(gridSize, 3)}px 0;
  border-bottom-color: rgb(235, 236, 240);
  border-bottom-style: solid;
  border-bottom-width: ${math.multiply(gridSize, 0.25)}px;
`;

const CodeStyle = styled.pre`
  background-color: rgb(23, 43, 77);
  box-sizing: border-box;
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  padding: ${gridSize}px;
  margin: 0;
  width: ${math.multiply(gridSize, 80)}px;
  overflow-x: auto;
  overflow-y: scroll;

  & code {
    font-family: Monaco, Menlo, monospace;
  }
`;

const PackageExample = ({ data, fileContents, children }) => {
  const highlighted = Prism.highlight(fileContents, Prism.languages.jsx);

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
          <ExampleStyle>
            <Header>
              <h1>Dynamic Table</h1>
              <LinkButton href={data.isolatedPath}>Full page view</LinkButton>
            </Header>
            <div style={{ padding: '24px 0px' }}>
              The Dynamic Table component is a table component with pagination
              and sorting functionality.
            </div>
            <ExampleComponentContainer>
              <div className="inner-container">{children}</div>
            </ExampleComponentContainer>
          </ExampleStyle>
          <CodeStyle data-testid="example-source-code">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </CodeStyle>
        </PageContent>
      </NavigationWrapper>
    </>
  );
};

PackageExample.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
    pageTitle: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  fileContents: PropTypes.string.isRequired,
};

export default PackageExample;
