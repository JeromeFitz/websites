import { marked } from 'marked'

import { getStyles, getImageStyles } from '~lib/og/getStyles'

export function getTemplate(
  text: string,
  theme: Theme,
  images: Image[],
  fontSize: string,
  markdown: boolean
) {
  // console.dir(`images`)
  // console.dir(images)
  return `
    <!DOCTYPE html>
    <html>
      ${getStyles(theme, fontSize)}
      <body>
        ${images
          .map(
            (image) =>
              `<img src="${image.src}" style="${getImageStyles(theme, image)}" />`
          )
          .join('+')}
        ${markdown ? marked.parse(text) : text}
      </body>
    </html>
  `
}
