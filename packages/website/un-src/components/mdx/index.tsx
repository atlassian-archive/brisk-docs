import * as React from 'react';
import Heading from './Heading';
import Link from '../switch-link';
import HorizontalRule from './HorizontalRule';
import { CodeBlock, InlineCode } from './code';

const components = {
  h1: (props: {}) => <Heading {...props} tag="h1" />,
  h2: (props: {}) => <Heading {...props} tag="h2" />,
  h3: (props: {}) => <Heading {...props} tag="h3" />,
  h4: (props: {}) => <Heading {...props} tag="h4" />,
  h5: (props: {}) => <Heading {...props} tag="h5" />,
  h6: (props: {}) => <Heading {...props} tag="h6" />,
  a: ({ children, ...props }: { children: React.ReactChild; href: string }) => {
    return <Link {...props}>{children}</Link>;
  },
  code: CodeBlock,
  inlineCode: InlineCode,
  hr: HorizontalRule,
};

export default components;
