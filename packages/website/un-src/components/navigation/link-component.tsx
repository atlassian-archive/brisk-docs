// Component that can be used as the component prop in nav items

import * as React from 'react';
import { Link } from 'gatsby';

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
    const internal = /^\/(?!\/)/.test(href);
    if (internal) {
      return (
        <Link to={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
}

export default LinkComponent;
