import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Item } from '@atlaskit/navigation-next';
import { colors } from '@atlaskit/theme';

import LinkComponent from './link-component';

// TODO TSFix - find out if we can actually get the prop types of withRouter
// here instead of defining our own
export type Props = RouteComponentProps & {
  text: string;
  href: string;
  id?: string;
  // router: {
  //   pathname: string;
  // };
  isHeading?: boolean;
};

const LinkWithRouter = ({ text, href, location, isHeading }: Props) => (
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
    isSelected={location.pathname === href}
    component={LinkComponent}
  />
);

export default withRouter(LinkWithRouter);
