import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, gridSize, themed, math } from '@atlaskit/theme';
import CodeIcon from '@atlaskit/icon/glyph/code';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

// TODO Can't copy ErrorBoundary (parent of Component to handle errors gracefully) from Atlaskit
// because componentDidCatch has no hook equivalent yet. Implement once support is added.

type Props = {
  /* The example component to be rendered */
  Component: React.ComponentType;
  /* The source code of the example component */
  source: string;
  /* The name of the example component */
  title: string | undefined;
};

const FileViewer = ({ Component, source, title }: Props) => {
  const [isSourceVisible, setIsSourceVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const highlighted = Prism.highlight(source, Prism.languages.jsx, 'jsx');

  const toggleLabel = isSourceVisible
    ? 'Hide Code Snippet'
    : 'Show Code Snippet';
  const state = isHover ? 'hover' : 'normal';
  const mode = isSourceVisible ? 'open' : 'closed';

  return (
    <Wrapper state={state} mode={mode}>
      <Toggle
        onClick={() => setIsSourceVisible(!isSourceVisible)}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        title={toggleLabel}
        mode={mode}
      >
        <ToggleTitle mode={mode}>{title}</ToggleTitle>
        <CodeIcon label={toggleLabel} />
      </Toggle>

      {isSourceVisible ? (
        <CodeStyle>
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </CodeStyle>
      ) : null}
      <ExampleShowcase>
        <Component />
      </ExampleShowcase>
    </Wrapper>
  );
};

export default FileViewer;

const TRANSITION_DURATION = '200ms';

const exampleBackgroundColor: any = {
  open: themed('state', {
    normal: { light: colors.N30, dark: colors.N700 },
    hover: { light: colors.N40, dark: colors.N600 },
  }),
  closed: themed('state', {
    normal: { light: colors.N20, dark: colors.DN50 },
    hover: { light: colors.N40, dark: colors.DN60 },
  }),
};
const toggleColor = themed('mode', {
  closed: { light: colors.N600, dark: colors.DN100 },
  open: { light: colors.N600, dark: colors.DN100 },
});

type WrapperProps = {
  state: string;
  mode: string;
};

const Wrapper = styled.div`
  background-color: ${(p: WrapperProps) => exampleBackgroundColor[p.mode]};
  border-radius: 5px;
  color: ${toggleColor};
  margin-top: 20px;
  padding: 0 ${gridSize}px ${gridSize}px;
  transition: background-color ${TRANSITION_DURATION};
`;

const Toggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${gridSize}px;
  transition: color ${TRANSITION_DURATION}, fill ${TRANSITION_DURATION};
`;

const ExampleShowcase = styled.div`
  background-color: ${colors.background};
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${gridSize}px;
`;

const CodeStyle = styled.pre`
  background-color: ${colors.N800};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  max-height: ${math.multiply(gridSize, 100)}px;
  padding: ${gridSize}px;
  margin: 0 0 ${gridSize}px;
  overflow: auto;
`;

export const ToggleTitle = styled.h4`
  color: ${toggleColor} !important;
  margin: 0;
`;
