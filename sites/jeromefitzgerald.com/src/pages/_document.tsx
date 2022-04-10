import { getCssText, reset } from '@jeromefitz/design-system/stitches.config'
import { info, fontFace } from '@jeromefitz/shared/src/styles/fonts/Inter'
import _map from 'lodash/map'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

/**
 * @note
 * Get the css and reset the internal css representation.
 * This is very *IMPORTANT* to do as the server might handle multiple requests
 * and we don't want to have the css accumulated from previous requests
 *
 * ref: https://github.com/radix-ui/design-system/pull/360
 */
const getCssAndReset = () => {
  const css = getCssText()
  reset()
  return css
}

const preloadImages = ['/static/images/bighead--jerome--dizzy.svg']

class MyDocument extends Document<DocumentContext> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="superfish" content="nofish" />
          <meta content="origin-when-cross-origin" name="referrer" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssAndReset() }}
          />
          {/* START: custom typeface */}
          {/* @ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link */}
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
          <link rel="preconnect" href="https://crane.jeromefitzgerald.com" />
          <meta name="msapplication-TileColor" content="#f4f4f4" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#f4f4f4" />
          {preloadImages.map((href, imageIndex) => (
            <link
              key={`preload-${imageIndex}`}
              rel="preload"
              href={href}
              as="image"
              media="(min-width: 80em)"
            />
          ))}
          <link rel="preconnect" href="https://cdn.jeromefitzgerald.com" />
          <link rel="dns-prefetch" href="https://cdn.jeromefitzgerald.com" />
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
