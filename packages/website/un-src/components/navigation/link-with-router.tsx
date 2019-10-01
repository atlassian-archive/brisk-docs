import * as React from 'react';
import { withRouter } from 'next/router';
import { Item } from '@atlaskit/navigation-next';
import { colors } from '@atlaskit/theme';

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
  isHeading?: boolean;
};

const LinkWithRouter = ({ text, href, router, isHeading }: Props) => (
  // <Item
  //   // @ts-ignore
  //   styles={styles => ({
  //     ...styles,
  //     itemBase: {
  //       ...styles.itemBase,
  //       paddingLeft: '4px',
  //       height: '32px',
  //     },
  //     textWrapper: {
  //       ...styles.textWrapper,
  //       color: isHeading ? colors.N800 : colors.N200,
  //     },
  //   })}
  //   text={text}
  //   href={href}
  //   isSelected={router.pathname === href}
  //   component={LinkComponent}
  // />
  <p>{text}</p>
);

export default withRouter(LinkWithRouter);
