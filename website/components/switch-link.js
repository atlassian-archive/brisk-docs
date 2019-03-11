import Link from 'next/link';
import * as PropTypes from 'prop-types';

/*
This link component is designed to contextually be either a straight anchor
or a next link depending on whether it is an internal or external link.

This will, in general, be the better component to use over using a straight
anchor, as it means you don't have to think about this problem space.
*/

const SwitchLink = ({ href, children, ...rest }) => {
    if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0) {
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    }
    return (
        <Link href={href}>
            <a {...rest}>{children}</a>
        </Link>
    );
};

SwitchLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SwitchLink;
