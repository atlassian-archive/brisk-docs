import React from 'react';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

const Collapsible = styled.div`
  height: 100vh;
  width: ${math.multiply(gridSize, 100)}px;
  transition: width 0.2s;
  overflow-x: auto;
  overflow-y: scroll;

  &.collapsed {
    width: 0;
    overflow: hidden;
  }
`;

const CodeStyle = styled.pre`
  background-color: rgb(23, 43, 77);
  box-sizing: border-box;
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  padding: ${gridSize}px;
  margin: 0;
  height: inherit;
  width: inherit;
  overflow: inherit;

  & code {
    font-family: Monaco, Menlo, monospace;
  }
`;

type Props = {
  isExpanded: boolean;
  fileContents: string;
};

const CodeView = ({ isExpanded, fileContents }: Props) => {
  // TODO format code with prettier based on width of code view
  // const printWidth = width / 10;
  // const prettified = prettier.format(fileContents, { printWidth });

  const highlighted = Prism.highlight(fileContents, Prism.languages.jsx, 'jsx');

  return (
    <Collapsible className={isExpanded ? 'expanded' : 'collapsed'}>
      <CodeStyle data-testid="example-source-code">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </CodeStyle>
    </Collapsible>
  );
};

export default CodeView;
