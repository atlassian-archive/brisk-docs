// Component that can be used as the component prop in nav items

import * as React from 'react';
import { Link } from 'gatsby';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { PageStatusContext } from './common/page-status-context';

export type Props = {
  children: React.ReactChild;
  includeShortcutIcon?: boolean; // default true - only has an effect for external links
  href: string;
};

// @atlaskit/item requires a class to be passed to it (otherwise we get
// ref errors from styled-components).
/* eslint-disable-next-line  react/prefer-stateless-function */

const LinkComponent = ({ className, children, href, includeShortcutIcon = true }: Props) => {
  const internal = /^(\/|\.\/|\.\.\/)(?!\/)/.test(href);
  if (internal) {
    let newHref = href.replace(/\.md$/, '');
    return (
      <Link to={newHref} className={className}>
         {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}{' '}
      {includeShortcutIcon && <ShortcutIcon label={href} size="small" />}
    </a>
  )
}

export default LinkComponent;
