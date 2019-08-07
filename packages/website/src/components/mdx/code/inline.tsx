import React from 'react';
import { AkCode } from '@atlaskit/code';

export type Props = {
  children: string;
};

export default ({ children }: Props) => (
  <AkCode text={children} language="text" />
);
