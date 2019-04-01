import * as React from 'react';
import { AkCode } from '@atlaskit/code';

interface Props {
  children: string;
}

export default ({ children }: Props) => <AkCode text={children} />;
