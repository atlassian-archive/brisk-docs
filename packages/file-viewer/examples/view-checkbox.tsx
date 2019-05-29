/* eslint-disable global-require */
/* eslint-disable import/no-webpack-loader-syntax */
import * as React from 'react';
import FileViewer from '../src/components/file-viewer';
import CheckboxExample from './example-files/atlaskit-checkbox';

export default () => (
  <FileViewer
    Component={CheckboxExample}
    source={require('!!raw-loader!./example-files/atlaskit-checkbox')}
    title="Checkbox"
  />
);
