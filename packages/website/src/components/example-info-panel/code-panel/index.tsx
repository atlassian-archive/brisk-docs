import * as React from 'react';
import { colors, gridSize, themed } from '@atlaskit/theme';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

const CodeStyle = styled.pre`
  background-color: rgb(23, 43, 77);
  box-sizing: border-box;
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  padding: ${gridSize}px;
  margin: 0;
  width: inherit;
  height: 100%;
  overflow: inherit;

  & code {
    font-family: Monaco, Menlo, monospace;
  }
`;

type Props = {
  fileContents: string;
};

const CodeView = ({ fileContents }: Props) => {
  // TODO format code with prettier based on width of code view
  // const printWidth = width / 10;
  // const prettified = prettier.format(fileContents, { printWidth });

  const highlighted = Prism.highlight(fileContents, Prism.languages.jsx, 'jsx');

  return (
    <CodeStyle data-testid="example-source-code">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </CodeStyle>
  );
};

export default CodeView;
