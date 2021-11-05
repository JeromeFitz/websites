import _map from 'lodash/map'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

// import { info, fontFace } from '~styles/fonts/F37Bella'
// import { info, fontFace } from '~styles/fonts/F37Bolton'
// import { info, fontFace } from '~styles/fonts/F37Ginger'
// import { info, fontFace } from '~styles/fonts/F37GingerRound'
import { info, fontFace } from '~styles/fonts/Inter'
// import { info, fontFace } from '~styles/fonts/NameSans'
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
          {/* START: custom typeface */}
          {_map(info.weights, (weight) => {
            return _map(weight, (file) => {
              const { href, type } = file
              return (
                <link
                  rel="preload"
                  href={href}
                  as="font"
                  type={type}
                  crossOrigin="anonymous"
                />
              )
            })
          })}
          <style
            dangerouslySetInnerHTML={{
              __html: fontFace,
            }}
          />
          {/* END: custom typeface */}
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
