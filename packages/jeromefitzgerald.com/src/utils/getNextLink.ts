import { nextSeo } from '~config/websites'

const getNextLink = (url: string) => {
  const urlNext = url
    .replace(nextSeo.url, '')
    // .replace('/playground/notion', '')
    .replace('//', '/')

  return {
    as: urlNext,
    href: urlNext === '/' ? '/' : `/[...catchAll]`,
  }
}

export default getNextLink
