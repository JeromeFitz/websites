import cx from 'clsx'
import Document, { Html, Head, Main, NextScript } from 'next/document'

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
          <link
            href="/apple-icon-57x57.png"
            rel="apple-touch-icon"
            sizes="57x57"
            type="image/png"
          />
          <link
            href="/apple-icon-60x60.png"
            rel="apple-touch-icon"
            sizes="60x60"
            type="image/png"
          />
          <link
            href="/apple-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
            type="image/png"
          />
          <link
            href="/apple-icon-76x76.png"
            rel="apple-touch-icon"
            sizes="76x76"
            type="image/png"
          />
          <link
            href="/apple-icon-114x114.png"
            rel="apple-touch-icon"
            sizes="114x114"
            type="image/png"
          />
          <link
            href="/apple-icon-120x120.png"
            rel="apple-touch-icon"
            sizes="120x120"
            type="image/png"
          />
          <link
            href="/apple-icon-144x144.png"
            rel="apple-touch-icon"
            sizes="144x144"
            type="image/png"
          />
          <link
            href="/apple-icon-152x152.png"
            rel="apple-touch-icon"
            sizes="152x152"
            type="image/png"
          />
          <link
            href="/apple-icon-180x180.png"
            rel="apple-touch-icon"
            sizes="180x180"
            type="image/png"
          />
          <link
            href="/android-icon-192x192.png"
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicon-96x96.png"
            rel="icon"
            sizes="96x96"
            type="image/png"
          />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/manifest.json" rel="manifest" />
          <meta name="msapplication-TileColor" content="#f4f4f4" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#f4f4f4" />
        </Head>
        <body
          className={cx(
            `loading`,
            `bg-white dark:bg-black`,
            `text-black dark:text-white`,
            ``
          )}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
