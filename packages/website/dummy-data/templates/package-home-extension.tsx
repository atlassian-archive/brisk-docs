import React from 'react';

export default ({
  data,
}: {
  data: { name: string; version: string };
  pageComponent: React.ElementType;
}) =>
  // @ts-ignore
  console.log(data) || (
    <div
      style={{
        fontSize: '14px',
      }}
    >
      <code>
        npm install {data.name}@^{data.version}
      </code>
    </div>
  );
