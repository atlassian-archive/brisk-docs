import React from 'react';
import App, { Container } from 'next/app';
import '@atlaskit/css-reset';
import { MDXProvider } from '@mdx-js/tag';
import components from '../components/mdx';
import Meta, { metadata } from '../components/meta-context';
import Title from '../components/page-title';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Meta.Provider value={metadata}>
        <Container>
          <Title />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Container>
      </Meta.Provider>
    );
  }
}
