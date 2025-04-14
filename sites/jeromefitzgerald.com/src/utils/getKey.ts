/**
 * @todo(types) string | string[]
 *
 * getKey => key
 * getKeyForGenerateStaticParams => return
 *
 */
export function getKey(segment: string, key: any) {
  if (segment === 'pages') {
    return `/${key}`
  }
  return `/${segment}/${Object.prototype.toString.call(key) === '[object Array]' ? key.join('/') : key}`
}

/**
 * @note (ಠ_ಠ)
 *
 *  [[...key]]        – Y to passing "segment"
 *  [...key] || [key] - N to passing "segment"
 *
 */
// @todo(types) string[] | string
export function getKeyForGenerateStaticParams(segment: string, key: string): any {
  const _key = key.replace(`/${segment}/`, '')
  return _key.includes('/') ? _key.split('/') : _key
}
