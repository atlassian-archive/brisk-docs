import React from 'react';
import Title from '../un-src/components/page-title';

const Layout = (props) => (
  <>
    <Title />
    {props.children}
  </>
)

export default Layout;