import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

import { getCssText } from '~styles/system/stitches.config'

class MyDocument extends Document<DocumentContext> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="superfish" content="nofish" />
          <meta content="origin-when-cross-origin" name="referrer" />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          {/* <link
            rel="preload"
            href="/static/fonts/inter/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/noprecache/fonts/name-sans/statics/Name_Sans_Variable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          /> */}
          <link
            rel="preload"
            href="/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
@font-face {
  font-family: 'Name Sans';
  font-weight: 400;
  font-display: swap;
  src: url(/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Regular.woff2) format('woff2'), url(/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Regular.woff) format('woff');
}

@font-face {
  font-family: 'Name Sans';
  font-weight: 700;
  font-display: swap;
  src: url(/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Bold.woff2) format('woff2'), url(/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Bold.woff) format('woff');
}
`,
            }}
          />
          {/*  */}
          {/* <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#848484"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#f4f4f4" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#f4f4f4" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
