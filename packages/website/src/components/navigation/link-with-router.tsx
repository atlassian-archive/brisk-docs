import * as React from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
// @ts-ignore
import { Item } from '@atlaskit/navigation-next';
// @ts-ignore
import { colors } from '@atlaskit/theme';

import LinkComponent from './link-component';

export type Props = {
  text: string;
  href: string;
  id?: string;
  isHeading?: boolean;
} & WithRouterProps;

const LinkWithRouter = ({ text, href, router, isHeading }: Props) => (
  <Item
    // @ts-ignore
    styles={styles => ({
      ...styles,
      itemBase: {
        ...styles.itemBase,
        paddingLeft: '4px',
        height: '32px',
      },
      textWrapper: {
        ...styles.textWrapper,
        color: isHeading ? colors.N800 : colors.N200,
      },
    })}
    text={text}
    href={href}
    isSelected={router.pathname === href}
    component={LinkComponent}
  />
);

export default withRouter(LinkWithRouter);
