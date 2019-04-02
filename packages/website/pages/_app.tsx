import * as React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import '@atlaskit/css-reset';
import { MDXProvider } from '@mdx-js/tag';
import components from '../components/mdx';
import Meta, { metadata } from '../components/meta-context';
import Title from '../components/page-title';

export type Props = {
  pageProps: any;
  Component: any;
};

export default class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
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
          {/* TODO: TSFix We are passing in undefined here as we convert to typescript, but this prop is optional and we should be able to remove this */}
          <Title title={undefined} />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Container>
      </Meta.Provider>
    );
  }
}
