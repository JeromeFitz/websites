import type { Image } from '@/app/_v16/types'

const blurDataURL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z'

const imageHeadline: Image = {
  alt: 'Lorem ipsum dolor',
  blurDataURL,
  height: 500,
  src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/tory-silver.jpg',
  width: 500,
}

const imageGallery: Image[] = [
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/show-posters/jerome-and--02--social.png',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/show-posters/jerome-and--09--social.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/show-posters/jerome-and--10--social.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/show-posters/jerome-and--12--social.jpg',
    width: 500,
  },
]

const imageGallery2: Image[] = [
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/sara.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/aob.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/erica.jpg',
    width: 500,
  },
  {
    blurDataURL,
    height: 500,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2026/03/very-normal-gents.jpg',
    width: 500,
  },
]

export { imageGallery, imageGallery2, imageHeadline }
