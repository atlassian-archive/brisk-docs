import * as React from 'react';

interface ContextInterface {
  siteName: string;
}

const ContextMeta = React.createContext<ContextInterface>({ siteName: '' });

export default ContextMeta;

// @ts-ignore
export { default as metadata } from '../data/site-meta.json';
