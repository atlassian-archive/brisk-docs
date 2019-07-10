import * as React from 'react';
import ExtensionsConsumer from '../extensions';
import ExampleInfoPanel, { Props } from './view';

export default (props: Props) => (
  <ExampleInfoPanel ExtensionsConsumer={ExtensionsConsumer} {...props} />
);
