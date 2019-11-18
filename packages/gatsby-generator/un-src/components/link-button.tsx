/*
Simple wrapper to use `gatsby-link` with `@atlaskit/button`. This should be used for all links
in the website, save those in places such as navigation.

Passes all props other than component directly into `@atlaskit/button`.
See the [@atlaskit/button](https://atlaskit.atlassian.com/packages/core/button) docs for
the options available to you.
*/
import * as React from 'react';

import Button from '@atlaskit/button';
import LinkComponent from './navigation/link-component';

const LinkButton = (props: typeof Button) => (
  <Button {...props} component={LinkComponent} />
);

export default LinkButton;
