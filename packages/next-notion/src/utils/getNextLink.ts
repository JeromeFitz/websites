/**
 * @todo(shared) this should be a variable passed to
 */
// import { nextSeo } from '~config/index'

const nextSeo = { url: `https://${process.env.NEXT_PUBLIC__SITE}` }

const getNextLink = (url: string) => {
  const urlNext = url.replace(nextSeo.url, '').replace('//', '/')

  return {
    as: urlNext,
    href: urlNext === '/' ? '/' : `/[...catchAll]`,
  }
}

export default getNextLink
