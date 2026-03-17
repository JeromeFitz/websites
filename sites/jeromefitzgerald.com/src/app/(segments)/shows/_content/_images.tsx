import type { Image } from '@/app/_v16/types'

// import Image_Show_JeromeAnd_AOB from '~public/images/temp/images/jerome-and/aob.jpg'
// import g from '~public/images/temp/images/jerome-and/erica.jpg'
// import e from '~public/images/temp/images/jerome-and/sara.jpg'
// import a from '~public/images/temp/images/jerome-and/show-posters/jerome-and--02--social.png'
// import b from '~public/images/temp/images/jerome-and/show-posters/jerome-and--09--social.jpg'
// import c from '~public/images/temp/images/jerome-and/show-posters/jerome-and--10--social.jpg'
// import d from '~public/images/temp/images/jerome-and/show-posters/jerome-and--12--social.jpg'
// import i from '~public/images/temp/images/jerome-and/tory-silver.jpg'
// import h from '~public/images/temp/images/jerome-and/very-normal-gents.jpg'

const blurDataURL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z'

const imageHeadline: Image = {
  alt: 'Lorem ipsum dolor',
  blurDataURL,
  height: 500,
  src: '/images/temp/images/jerome-and/tory-silver.jpg',
  width: 500,
}

const imageGallery: Image[] = [
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/show-posters/jerome-and--02--social.png',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/show-posters/jerome-and--09--social.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/show-posters/jerome-and--10--social.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/show-posters/jerome-and--12--social.jpg',
    width: 500,
  },
]

const imageGallery2: Image[] = [
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/sara.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/aob.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/erica.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: '/images/temp/images/jerome-and/very-normal-gents.jpg',
    width: 500,
  },
]

export { imageGallery, imageGallery2, imageHeadline }
