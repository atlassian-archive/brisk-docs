import * as React from 'react';
import { withRouter } from 'next/router';
import { Item } from '@atlaskit/navigation-next';

import LinkComponent from './link-component';

// TODO TSFix - find out if we can actually get the prop types of withRouter
// here instead of defining our own
export type Props = {
  text: string;
  href: string;
  id?: string;
  router: {
    pathname: string;
  };
};

const LinkWithRouter = ({ text, href, router }: Props) => (
  <Item
    // @ts-ignore
    styles={styles => ({
      ...styles,
      // itemBase: {},
      itemBase: { ...styles.itemBase, paddingLeft: '4px', height: '32px' },
    })}
    text={text}
    href={href}
    isSelected={router.pathname === href}
    component={LinkComponent}
  />
);

export default withRouter(LinkWithRouter);
