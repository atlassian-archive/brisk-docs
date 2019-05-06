import * as React from 'react';

interface ContextInterface {
  siteName: string;
  packagesDescription: string;
  description?: string;
}

const ContextMeta = React.createContext<ContextInterface>({
  siteName: '',
  packagesDescription: '',
});

export default ContextMeta;

// @ts-ignore
export { default as metadata } from '../../data/site-meta.json';
