// Component that can be used as the component prop in nav items

import React, { Component } from 'react';
import Link from 'next/link';
import * as PropTypes from 'prop-types';

// @atlaskit/item requires a class to be passed to it (otherwise we get
// ref errors from styled-components).
/* eslint-disable-next-line  react/prefer-stateless-function */
class LinkComponent extends Component {
  render() {
    const { className, children, href } = this.props;

    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }
}

LinkComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default LinkComponent;
