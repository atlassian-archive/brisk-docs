import * as React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext as NextDocumentContext,
} from 'next/document';
import { extractCritical } from 'emotion-server';
import { ServerStyleSheet } from 'styled-components';

export type Props = {
  css: any;
  styleTags: any;
  __NEXT_DATA__: any;
  ids: any;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    let emotionStyles = {};
    if (page.html) {
      emotionStyles = extractCritical(page.html);
    }
    const styledComponentsTags = sheet.getStyleElement();

    return { ...page, ...emotionStyles, styleTags: styledComponentsTags };
  }

  constructor(props: Props) {
    // @ts-ignore
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
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: css }} />
          {styleTags}
          <style
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `img {
            max-width: 100%
          }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
