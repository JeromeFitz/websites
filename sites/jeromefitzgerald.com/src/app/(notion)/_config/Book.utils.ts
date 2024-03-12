import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PropertiesBook } from '@/app/(notion)/_config/index'

function getPropertyTypeDataBook(properties, property: keyof PropertiesBook) {
  return getPropertyTypeData(properties, property)
}

function getBookData(properties) {
  // if (!properties) return {}
  // console.dir(properties)
  const data = {
    author: getPropertyTypeDataBook(properties, 'Author'),
    // dateRead: getPropertyTypeDataBook(properties, 'Date.Read'),
    dateReleased: getPropertyTypeDataBook(properties, 'Date.Released'),
    dateReleasedIso: getPropertyTypeDataBook(properties, 'Date.Released.ISO'),
    href: getPropertyTypeDataBook(properties, 'Slug.Preview'),
    id: getPropertyTypeDataBook(properties, 'ID'),
    isActive: getPropertyTypeDataBook(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataBook(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataBook(properties, 'Is.Published'),
    isbn13Hard: getPropertyTypeDataBook(properties, 'ISBN-13.Hard'),
    isbn13Soft: getPropertyTypeDataBook(properties, 'ISBN-13.Soft'),
    pages: getPropertyTypeDataBook(properties, 'Pages'),
    publisher: getPropertyTypeDataBook(properties, 'Publisher'),
    // seoDescription: getPropertyTypeDataBook(properties, 'SEO.Description'),
    seoImage: getPropertyTypeDataBook(properties, 'SEO.Image')[0],
    // seoImageDescription: getPropertyTypeDataBook(
    //   properties,
    //   'SEO.Image.Description',
    // ),
    // seoKeywords: getPropertyTypeDataBook(properties, 'SEO.Keywords'),
    status: getPropertyTypeDataBook(properties, 'Status'),
    subtitle: getPropertyTypeDataBook(properties, 'Subtitle'),
    title: getPropertyTypeDataBook(properties, 'Title'),
    // urlAmazon: getPropertyTypeDataBook(properties, 'URL.Amazon'),
    urlBiblio: getPropertyTypeDataBook(properties, 'URL.Biblio'),
    urlBookshop: getPropertyTypeDataBook(properties, 'URL.Bookshop'),
    // urlGoodreads: getPropertyTypeDataBook(properties, 'URL.Goodreads'),
  }
  return data
}

export { getBookData, getPropertyTypeDataBook }
