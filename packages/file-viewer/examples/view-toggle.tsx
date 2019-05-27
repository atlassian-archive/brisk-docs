import * as React from 'react';
import FileViewer from '../src/components/file-viewer';
import ToggleExample from './example-files/atlaskit-toggle';

export default () => (
  <FileViewer
    Component={ToggleExample}
    source={require('!!raw-loader!./example-files/atlaskit-toggle')}
    title="Toggle"
  />
);
