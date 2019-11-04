// Component that can be used as the component prop in nav items

import * as React from 'react';
import { Link } from 'gatsby';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';

export type Props = {
  children: React.ReactChild;
  includeShortcutIcon?: boolean; // default true - only has an effect for external links
  href: string;
  className?: string;
};

// @atlaskit/item requires a class to be passed to it (otherwise we get
// ref errors from styled-components).
/* eslint-disable-next-line  react/prefer-stateless-function */

const LinkComponent: React.ComponentType<Props> = ({
  className,
  children,
  href,
  includeShortcutIcon = true,
  ...rest
}: Props) => {
  const internal = /^(\/|\.\/|\.\.\/)(?!\/)/.test(href);
  if (internal) {
    const newHref = href.replace(/\.md$/, '');
    return (
      <Link
        to={newHref}
        className={className}
        // @ts-ignore
        data-testid={rest['data-testid']}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      // @ts-ignore
      data-testid={rest['data-testid']}
    >
      {children}
      {includeShortcutIcon && <ShortcutIcon label={href} size="small" />}
    </a>
  );
};

export default LinkComponent;
