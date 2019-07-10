import * as React from 'react';
import { Item } from '@atlaskit/navigation-next';

export default ({ packageName }: { packageName: string }) => (
  <Item text={`${packageName} stats`} />
);
