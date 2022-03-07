import Slugger from 'github-slugger'
import _startsWith from 'lodash/startsWith'
import type { IGetPlaiceholderReturn } from 'plaiceholder'
import validUrl from 'valid-url'

import { CACHE_TYPES } from './constants'
import { getCache, setCache } from './getCache'

interface IGetPlaiceholderReturnCustom
  extends Omit<IGetPlaiceholderReturn, 'blurhash' | 'css' | 'svg'> {
  id: string
  url: string
}

/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const cacheOverride =
  process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL
const keyPrefix = 'image'

/**
 * @note(!cache)
 *
 * - if two urls are the same
 * - we _do_ want same slug
 *
 */
const getImage = async (_url: string) => {
  let data: IGetPlaiceholderReturnCustom | undefined,
    id: string,
    key: string,
    url: string

  /**
   * @note(cache) if we are passed `image/` we are being passed a key to check
   */
  if (_startsWith(_url, 'image/')) {
    key = _url
  } else {
    url = _url
    if (validUrl.isHttpsUri(url)) {
      id = Slugger.slug(url)
      key = `${keyPrefix}/${id}`.toLowerCase()
    } else {
      data = undefined
      return data
    }
  }

  if ((cache && isBuildStep) || isDev) {
    // console.dir(`getImage => cache && isBuildStep: ${cacheType} => ${key}`)
    data = await getCache({ cacheType, key })
  }

  if (!data || data === undefined) {
    const { getPlaiceholder } = await import('plaiceholder')
    const { base64, img } = await getPlaiceholder(url)
    data = { base64, id: key, img, url }

    if (cache || cacheOverride) {
      // console.dir(`getImage => cache || cacheOverride: ${cacheType} => ${key}`)
      setCache({ cacheType, data, key })
    }
  }

  return data
}

export { getImage }
