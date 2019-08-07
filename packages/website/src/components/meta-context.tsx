import React from 'react';

export interface LinkObject {
  label: string;
  description?: string;
  href: string;
  imgSrc?: string;
}

export interface DocumentObject {
  docsPath: string;
  name: string;
  description?: string;
  imgSrc?: string;
  urlPath: string;
}

export interface ReadMeObject {
  imgSrc?: string;
}

export interface PackagesObject {
  description: string;
  imgSrc?: string;
}

interface ContextInterface {
  siteName: string;
  packages: PackagesObject;
  readMe?: ReadMeObject;
  links: LinkObject[];
  docs: DocumentObject[];
}

const ContextMeta = React.createContext<ContextInterface>({
  siteName: '',
  packages: {
    description: '',
  },
  links: [],
  docs: [],
});

export default ContextMeta;

// @ts-ignore
export { default as metadata } from '../../data/site-meta.json';
