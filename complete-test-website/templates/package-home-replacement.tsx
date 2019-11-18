import React from 'react';

export default ({
  pageComponent: Component,
}: {
  data: Object;
  pageComponent: React.ElementType;
}) => (
  <div
    style={{
      textAlign: 'center',
      color: 'rebeccapurple',
      backgroundColor: 'hotpink',
      borderRadius: '16px',
      padding: '8px',
      marginTop: '16px',
    }}
  >
    <Component />
  </div>
);
