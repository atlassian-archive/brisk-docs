import * as React from 'react';
// @ts-ignore
import { AkCode } from '@atlaskit/code';

export type Props = {
  children: string;
};

export default ({ children }: Props) => (
  <AkCode text={children} language="text" />
);
