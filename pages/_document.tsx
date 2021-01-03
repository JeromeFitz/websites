import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document<any> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            // href="/static/fonts/name-sans/name_sans-variable.woff2"
            href="/static/fonts/inter/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    url: ctx?.req?.url || '',
  }
}

export default MyDocument
