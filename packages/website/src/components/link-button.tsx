/*
Simple wrapper to use `next/link` with `@atlaskit/button`. This should be used for all links
in the website, save those in places such as navigation.

Passes all props other than component directly into `@atlaskit/button`.
See the [@atlaskit/button](https://atlaskit.atlassian.com/packages/core/button) docs for
the options available to you.
*/
import * as React from 'react';

import Button from '@atlaskit/button';
import { Link } from 'react-router-dom';

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
  <Link to={href} {...rest}>
    {children}
  </Link>
);

const LinkButton = (props: typeof Button) => (
  <Button {...props} component={LinkButtonRenderComponent} />
);

export default LinkButton;
