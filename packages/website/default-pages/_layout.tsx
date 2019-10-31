import React from 'react';
import Title from '../un-src/components/page-title';

const Layout = ({ children }: { children: any }) => (
  <>
    <Title />
    {children}
  </>
);

export default Layout;
