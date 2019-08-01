// Component that can be used as the component prop in nav items

import * as React from 'react';
import { Link } from 'react-router-dom';

export type Props = {
  className: string;
  children: React.ReactChild;
  href: string;
};

// @atlaskit/item requires a class to be passed to it (otherwise we get
// ref errors from styled-components).
// TODO: Maybe need to use NavLink instead of Link to support class names
/* eslint-disable-next-line  react/prefer-stateless-function */
class LinkComponent extends React.Component<Props> {
  render() {
    const { className, children, href } = this.props;

    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
}

export default LinkComponent;
