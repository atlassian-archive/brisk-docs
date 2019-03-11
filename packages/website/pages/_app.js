import React from 'react';
import App, { Container } from 'next/app';
import '@atlaskit/css-reset';
import { MDXProvider } from '@mdx-js/tag';
import components from '../components/mdx';

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
      <Container>
        <title>Bright Document</title>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Container>
    );
  }
}
