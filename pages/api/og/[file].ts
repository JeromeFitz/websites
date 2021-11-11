// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * ref: https://github.com/vercel/og-image/pull/162/files
 * components/playground.tsx
 * const url =
    '/api/og-image.png' +
    '?' +
    `theme=${encodeURIComponent(theme)}` +
    '&' +
    `text=${encodeURIComponent(text)}` +
    '&' +
    `text_size=${encodeURIComponent(textSize)}` +
    '&' +
    `img=${images.map((image) => encodeURIComponent(image)).join('&image=')}` +
    '&' +
    `img_size=${encodeURIComponent(imageSize)}`;
 */
import type { NextApiHandler } from 'next'

import { getScreenshot } from '~lib/og/getScreenshot'
import { getTemplate } from '~lib/og/getTemplate'
import { parseFile } from '~lib/og/parseFile'
import { parseImages } from '~lib/og/parseImages'
import {
  parseQueryArray,
  parseQueryBoolean,
  parseQueryString,
} from '~lib/og/parseQuery'

const API: NextApiHandler = async (req, res) => {
  const { file, theme, fontSize, images, widths, heights, md, debugHTML } = req.query

  const parsedFile = parseQueryString(file)
  const { slug, extension } = parseFile(parsedFile)

  const parsedThemePreference = parseQueryString(theme)
  const parsedFontSize = parseQueryString(fontSize)

  const parsedImageSources = parseQueryArray(images)
  const parsedImageWidths = parseQueryArray(widths)
  const parsedImageHeights = parseQueryArray(heights)

  const parsedMD = parseQueryBoolean(md)
  const parsedDebugHTML = parseQueryBoolean(debugHTML)

  const parsedTheme = parsedThemePreference == 'dark' ? 'dark' : 'light'

  const parsedImages = parseImages(
    parsedImageSources,
    parsedImageWidths,
    parsedImageHeights
  )

  const fallbackImage = {
    src:
      theme == 'light'
        ? 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg'
        : 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg',
    width: '16',
    height: '16',
  }

  const template = getTemplate(
    slug,
    parsedTheme,
    // parsedImages.length ? parsedImages : [fallbackImage],
    parsedImages.length ? [fallbackImage] : [fallbackImage],
    parsedFontSize.length ? parsedFontSize : '12',
    parsedMD
  )

  // console.dir(`template`)
  // console.dir(template)
  // console.dir(`parsedDebugHTML`)
  // console.dir(parsedDebugHTML)
  // console.dir(`parseImages`)
  // console.dir(parseImages)

  if (parsedDebugHTML) {
    res.status(200).send(template)
  } else {
    res.setHeader('Content-Type', `image/${extension}`)
    res.setHeader('Cache-Control', 'public, immutable, max-age=604800')

    const screenshot = await getScreenshot(template, extension)
    res.status(200).send(screenshot)
  }
}

export default API
