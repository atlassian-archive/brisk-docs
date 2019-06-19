import * as React from 'react';
import dynamic from 'next/dynamic';
// import { Editor } from '@atlaskit/editor-core';

const Editor = dynamic(import('../editor-import'), {
  ssr: false
});

export default function Example() {
  return (
    <Editor appearance="comment" />
  );
}
