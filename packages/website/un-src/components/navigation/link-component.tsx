// Component that can be used as the component prop in nav items

import * as React from 'react';
import Link from 'next/link';

export type Props = {
  className: string;
  children: React.ReactChild;
  href: string;
};

// @atlaskit/item requires a class to be passed to it (otherwise we get
// ref errors from styled-components).
/* eslint-disable-next-line  react/prefer-stateless-function */
class LinkComponent extends React.Component<Props> {
  render() {
    const { className, children, href } = this.props;

    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }
}

export default LinkComponent;
