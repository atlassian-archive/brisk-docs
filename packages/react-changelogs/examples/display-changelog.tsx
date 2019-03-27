import * as React from 'react';
import Changelog from '../src/components/changelog';

const data = `# This package itself

## 1.0.0
- [major] 24601
## 0.5.0
- [minor] Who am I?`;

export default () => (
  <div>
    <Changelog changelog={data} getUrl={() => null} />
  </div>
);
