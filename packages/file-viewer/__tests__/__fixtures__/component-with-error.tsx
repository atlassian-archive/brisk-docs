import * as React from 'react';

export default () => {
  throw new Error('I crashed!');

  // eslint-disable-next-line no-unreachable
  return <div>Not reached</div>;
};
