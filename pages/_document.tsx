import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { Manifest } from '~components/Seo'

class MyDocument extends Document<any> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="superfish" content="nofish" />
          <meta content="origin-when-cross-origin" name="referrer" />
          <link
            rel="preload"
            href="/static/fonts/inter/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" /> */}
        </Head>
        <Manifest />
        <body className="bg-white dark:bg-black text-black dark:text-white">
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
