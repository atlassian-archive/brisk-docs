import React from 'react';
import reactAddonsTextContent from 'react-addons-text-content';
import snakeCase from 'lodash.snakecase';
import PropTypes from 'prop-types';

function dashcase(children) {
    // this matches the IDs that are used for links naturally by remark
    return snakeCase(reactAddonsTextContent(children)).replace(/_/g, '-');
}

const Heading = ({ tag: Tag, children }) => <Tag id={dashcase(children)}>{children}</Tag>;

Heading.propTypes = {
    tag: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Heading;
