import * as React from 'react';
import ExampleInfoPanel from './view';

const MockExtensionsConsumer = ({ children }) =>
  children([
    {
      Component: () => <div>Hello</div>,
      meta: {
        label: ' Plugin 1',
      },
    },
    {
      Component: () => <div>Hello again</div>,
      meta: {
        label: ' Plugin 2',
      },
    },
  ]);

export default () => (
  <ExampleInfoPanel
    isExpanded
    fileContents="// File contents"
    ExtensionsConsumer={MockExtensionsConsumer}
  />
);
