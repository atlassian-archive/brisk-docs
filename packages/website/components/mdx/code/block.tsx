import * as React from 'react';
import { AkCodeBlock } from '@atlaskit/code';

interface Props {
  children: string;
  className?: string;
}

const getLanguageName = (className: string) => {
  return className.replace(/language-/, '');
};

export default ({ children, className }: Props) => (
  <AkCodeBlock
    text={children}
    language={className && getLanguageName(className)}
  />
);
