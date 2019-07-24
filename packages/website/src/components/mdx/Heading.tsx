import * as React from 'react';
// @ts-ignore
import reactAddonsTextContent from 'react-addons-text-content';
// @ts-ignore
import snakeCase from 'lodash.snakecase';

function dashcase(children?: React.ReactChild) {
  // this matches the IDs that are used for links naturally by remark
  return snakeCase(reactAddonsTextContent(children)).replace(/_/g, '-');
}

export type Props = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactChild;
};

const Heading = ({ tag: Tag, children }: Props) => (
  <Tag id={dashcase(children)} style={{ marginTop: '32px' }}>
    {children}
  </Tag>
);

export default Heading;
