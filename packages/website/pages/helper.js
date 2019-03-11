import Link from 'next/link';
import links from '../data/pages-list.json';

export default () => (
  <ul>
    {links.map(link => (
      <li key={link.homePath}>
        <Link href={link.homePath}>{link.homePath}</Link>
      </li>
    ))}
  </ul>
);
