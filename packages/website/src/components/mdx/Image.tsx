import React from 'react';

const Image = (props: Object) => (
  // The alt is in the spread props, which this can't trace
  // eslint-disable-next-line jsx-a11y/alt-text
  <img {...props} style={{ maxWidth: '100%' }} />
);

export default Image;
