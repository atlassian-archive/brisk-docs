import * as React from 'react';
import '@atlaskit/css-reset';
import { MDXProvider } from '@mdx-js/tag';
import components from '../un-src/components/mdx';
import Meta, { metadata } from '../un-src/components/meta-context';
import Title from '../un-src/components/page-title';

export default class Layout extends React.Component<any> {
  // static async getInitialProps({ Component, ctx }: NextAppContext) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  componentDidMount() {
    /**
     * Set a marker on body indicating that we've rendered on the client side (componentDidMount does not execute on the server).
     * This is required for our cypress tests to wait before trying to fetch elements otherwise they may become stale if they are
     * fetched before React renders over the server-side DOM.
     * See https://github.com/cypress-io/cypress/issues/695#issuecomment-333158645
     */
    // eslint-disable-next-line no-undef
    document.body.dataset.clientLoaded = 'true';
  }

  render() {
    return (
      <Meta.Provider value={metadata}>
        <Title />
        <MDXProvider components={components}>
          {this.props.children}
        </MDXProvider>
      </Meta.Provider>
    );
  }
}
