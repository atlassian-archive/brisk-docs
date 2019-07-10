import * as React from 'react';
import flatten from 'lodash.flatten';

import extensionsList from '../../extensions-list';

export interface Extension {
  Component: React.ComponentType;
  meta: any;
}

interface ExtensionDefinition {
  extensionPoint: string;
  extension: Extension;
}

export interface ConsumerProps {
  extensionPoint: string;
  children: (extensions: Extension[]) => React.ReactNode;
}

const extensions: ExtensionDefinition[] = flatten(extensionsList);

console.log(extensions);

const ExtensionsConsumer: React.ComponentType<ConsumerProps> = ({
  children,
  extensionPoint,
}: ConsumerProps) =>
  children(
    extensions
      .filter(extension => extension.extensionPoint === extensionPoint)
      .map(extension => extension.extension),
  );

export default ExtensionsConsumer;
