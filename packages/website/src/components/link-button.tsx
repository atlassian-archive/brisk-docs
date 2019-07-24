/*
Simple wrapper to use `next/link` with `@atlaskit/button`. This should be used for all links
in the website, save those in places such as navigation.

Passes all props other than component directly into `@atlaskit/button`.
See the [@atlaskit/button](https://atlaskit.atlassian.com/packages/core/button) docs for
the options available to you.
*/
import * as React from 'react';

// @ts-ignore
import Button from '@atlaskit/button';
import Link from 'next/link';

/** Note: Render components need to be defined standalone. Defining them inline will create a
 * new function reference each time and cause re-mounts on each render. */
const LinkButtonRenderComponent = ({
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
);

const LinkButton = (props: typeof Button) => (
  <Button {...props} component={LinkButtonRenderComponent} />
);

export default LinkButton;
