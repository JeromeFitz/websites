import { slug as _slug } from 'github-slugger'
import { isHttpsUri } from 'valid-url'

export function getImageKeySlug(imageUrl: string) {
  let key = '',
    slug = ''
  if (isHttpsUri(imageUrl)) {
    slug = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
    key = `/image/${slug}`.toLowerCase()
  }
  return { key, slug }
}
