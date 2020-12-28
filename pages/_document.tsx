import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import GoogleFonts from 'next-google-fonts'

class MyDocument extends Document<any> {
  render() {
    return (
      <Html lang="en">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
          {/* <link
            rel="preconnect"
            // href="/static/fonts/name-sans/name_sans-variable.woff2"
            href="/static/fonts/inter/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          /> */}
          <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" />
        </Head>
        <body className="bg-white dark:bg-black text-white dark:text-black">
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
