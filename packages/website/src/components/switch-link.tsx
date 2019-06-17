import * as React from 'react';
import Link from 'next/link';
import { withRouter, SingletonRouter } from 'next/router';
import * as PropTypes from 'prop-types';
import { PageStatusContext } from './common/page-status-context';

const urlHasTrailingSlash = (router: SingletonRouter) => {
  if (!router.asPath) {
    return null;
  }

  const pathnameLength = router.pathname.length;
  const pathnameIndex = router.asPath.indexOf(router.pathname);
  if (pathnameIndex === -1) {
    return null;
  }

  return router.asPath[pathnameIndex + pathnameLength] === '/';
};

/*
This link component is designed to contextually be either a straight anchor
or a next link depending on whether it is an internal or external link.

This will, in general, be the better component to use over using a straight
anchor, as it means you don't have to think about this problem space.
*/

export type Props = {
  href: string;
  children: React.ReactChild;
  router?: SingletonRouter;
};

const SwitchLink = ({ href, children, router, ...rest }: Props) => {
  if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  let newHref = href.replace(/\.md$/, '');

  const { convertedToDir = false } = React.useContext(PageStatusContext);

  /*
  Fun Fact: Next does not (and won't) handle relative links in exports.

  Because of this, we are doing link-surgery to fix it here.

  In the future, I would like to move this to the build step to convert
  relative links.

  Assumption: We are assuming if the node env is production then we are in
  a statically exported next app.

  `convertedToDir` is set to true when a README page has been converted to an
  indexed page, e.g. package home. In this case, we actually require the additional
  slash that next adds as part of its export so we can skip link surgery.
  */
  if (process.env.NODE_ENV === 'production' && !convertedToDir) {
    if (newHref.startsWith('./')) {
      newHref = newHref.replace('./', '../');
    } else if (newHref.startsWith('../')) {
      newHref = newHref.replace('../', '../../');
    }
  } else if (process.env.NODE_ENV !== 'production' && convertedToDir) {
    /* In dev (non-export) mode, URLs work both with and without trailing slash URLs.
     * Relative links in pages that have been converted to directories will only work when
     * the URL contains a trailing slash, so modify the relative link if the current URL does
     * not have one.
     * This should ideally be fixed by enforcing trailing or non-trailing slashed URLs */
    if (
      newHref.startsWith('.') &&
      router &&
      urlHasTrailingSlash(router) === false
    ) {
      const urlSegments = router.pathname.split('/');
      const lastUrlSegment = urlSegments[urlSegments.length - 1];
      newHref = `./${lastUrlSegment}/${newHref}`;
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
  router: PropTypes.shape({
    asPath: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

export default withRouter(SwitchLink as any) as SwitchLink;
