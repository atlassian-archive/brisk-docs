import * as React from 'react';
import Link from 'next/link';
import * as PropTypes from 'prop-types';

/*
This link component is designed to contextually be either a straight anchor
or a next link depending on whether it is an internal or external link.

This will, in general, be the better component to use over using a straight
anchor, as it means you don't have to think about this problem space.
*/

export type Props = {
  href: string;
  children: React.ReactChild;
};

const SwitchLink = ({ href, children, ...rest }: Props) => {
  if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  let newHref = href.replace(/\.md$/, '');

  /*
  Fun Fact: Next does not (and won't) handle relative links in exports.

  Because of this, we are doing link-surgery to fix it here.

  In the future, I would like to move this to the build step to convert
  relative links.
  */
  if (process.env.NODE_ENV === 'production') {
    if (newHref.startsWith('./')) {
      newHref = newHref.replace('./', '../');
    } else if (newHref.startsWith('../')) {
      newHref = newHref.replace('../', '../../');
    }
  }

  return (
    <Link href={newHref}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

SwitchLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SwitchLink;
