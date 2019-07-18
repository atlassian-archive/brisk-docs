import * as React from 'react';

export interface LinkObject {
  label: string;
  description?: string;
  href: string;
}

interface ContextInterface {
  [key: string]: any; // docs
  siteName: string;
  packagesDescription: string;
  links: LinkObject[];
}

const ContextMeta = React.createContext<ContextInterface>({
  siteName: '',
  packagesDescription: '',
  links: [],
});

export default ContextMeta;

// @ts-ignore
export { default as metadata } from '../../data/site-meta.json';
