import * as PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Item } from '@atlaskit/navigation-next';

import LinkComponent from './link-component';

const LinkWithRouter = ({ text, href, router }) => (
    <Item text={text} href={href} isSelected={router.pathname === href} component={LinkComponent} />
);

LinkWithRouter.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    router: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default withRouter(LinkWithRouter);
