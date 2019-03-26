import React from 'react';
import Link from 'next/link';
import links from '../pages-list';

export default () => (
  <ul>
    {links.map(link => (
      <li key={link.homePath}>
        <Link href={link.homePath}>{link.homePath}</Link>
      </li>
    ))}
  </ul>
);
