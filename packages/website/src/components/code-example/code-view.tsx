import * as React from 'react';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
import styled from '@emotion/styled';
import Prism from 'prismjs';

const CodeStyle = styled.pre`
  background-color: rgb(23, 43, 77);
  box-sizing: border-box;
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${math.multiply(gridSize, 80)}px;
  padding: ${gridSize}px;
  margin: 0;
  overflow-x: auto;
  overflow-y: scroll;
  transition: width 0.3s;

  &.collapsed {
    width: 0px;
  }

  & code {
    font-family: Monaco, Menlo, monospace;
  }
`;

type Props = {
  isExpanded: boolean,
  fileContents: string
};

const ExampleSource = ({ isExpanded, fileContents }: Props) => {
  const highlighted = Prism.highlight(fileContents, Prism.languages.jsx);

  return (
    <CodeStyle className={isExpanded ? 'expanded' : 'collapsed'} data-testid="example-source-code">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </CodeStyle>
  );
};

export default ExampleSource;