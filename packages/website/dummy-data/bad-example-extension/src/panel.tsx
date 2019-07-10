import * as React from 'react';
import styled from '@emotion/styled';

const Panel = styled.div`
  padding: 8px;
`;

export default ({ fileContents }: { fileContents: string }) => (
  <Panel>
    <h1>Bad stats plugin</h1>
    <h5>This is the worst plugin ever made</h5>
    <hr />
    <h6>Lines of code</h6>
    {fileContents.split('\n').length}
    <h6>Comments</h6>
    {
      fileContents.split('\n').filter((line: string) => line.startsWith('//'))
        .length
    }
  </Panel>
);
