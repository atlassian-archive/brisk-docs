import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import { ServerStyleSheet } from 'styled-components';

export type Props = {
  css: any;
  styleTags: any;
};

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => (props: Props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const emotionStyles = extractCritical(page.html);
    const styledComponentsTags = sheet.getStyleElement();

    return { ...page, ...emotionStyles, styleTags: styledComponentsTags };
  }

  constructor(props: Props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    // TODO TSFix - these both come back as undefined values at all times?
    const { css, styleTags } = this.props;

    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/_next/static/css/styles.chunk.css" />
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
