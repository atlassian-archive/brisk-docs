/* eslint-disable global-require */
/* eslint-disable import/no-webpack-loader-syntax */
import * as React from 'react';
import FileViewer from '../src/components/file-viewer';
import ButtonExample from './example-files/atlaskit-button';

export default () => (
  <FileViewer
    Component={ButtonExample}
    source={require('!!raw-loader!./example-files/atlaskit-button')}
    title="Button"
  />
);
