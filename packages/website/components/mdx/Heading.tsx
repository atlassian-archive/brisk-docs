import * as React from 'react';
import reactAddonsTextContent from 'react-addons-text-content';
import snakeCase from 'lodash.snakecase';

function dashcase(children?: React.ReactChild) {
  // this matches the IDs that are used for links naturally by remark
  return snakeCase(reactAddonsTextContent(children)).replace(/_/g, '-');
}

export type Props = {
  tag: string;
  children?: React.ReactChild;
};

const Heading = ({ tag: Tag, children }: Props) => (
  <Tag id={dashcase(children)}>{children}</Tag>
);

export default Heading;
