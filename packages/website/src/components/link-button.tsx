/*
Simple wrapper to use `next/link` with `@atlaskit/button`. This should be used for all links
in the website, save those in places such as navigation.

Passes all props other than component directly into `@atlaskit/button`.
See the [@atlaskit/button](https://atlaskit.atlassian.com/packages/core/button) docs for
the options available to you.
*/
import * as React from 'react';

import Button from '@atlaskit/button';
import Link from 'next/link';

const LinkButton = (props: {
  children: React.ReactChild;
  href: string;
  appearance: string;
}) => (
  <Button
    {...props}
    component={({
      href,
      children,
      ...rest
    }: {
      href: string;
      children: React.ReactNode;
    }) => (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    )}
  />
);

export default LinkButton;
