// Component that can be used as the component prop in nav items

import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <NavLink to={href} className={className}>
        {children}
      </NavLink>
    );
  }
}

export default LinkComponent;
