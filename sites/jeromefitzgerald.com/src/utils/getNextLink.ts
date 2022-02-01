import { nextSeo } from '~config/index'

const getNextLink = (url: string) => {
  const urlNext = url.replace(nextSeo.url, '').replace('//', '/')

  return {
    as: urlNext,
    href: urlNext === '/' ? '/' : `/[...catchAll]`,
  }
}

export default getNextLink
