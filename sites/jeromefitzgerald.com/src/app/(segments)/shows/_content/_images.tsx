import type { Image } from '@/app/_v16/types'

import Image_Show_JeromeAnd_AOB from '~public/images/temp/images/jerome-and/aob.jpg'
import g from '~public/images/temp/images/jerome-and/erica.jpg'
import e from '~public/images/temp/images/jerome-and/sara.jpg'
import a from '~public/images/temp/images/jerome-and/show-posters/jerome-and--02--social.png'
import b from '~public/images/temp/images/jerome-and/show-posters/jerome-and--09--social.jpg'
import c from '~public/images/temp/images/jerome-and/show-posters/jerome-and--10--social.jpg'
import d from '~public/images/temp/images/jerome-and/show-posters/jerome-and--12--social.jpg'
import i from '~public/images/temp/images/jerome-and/tory-silver.jpg'
import h from '~public/images/temp/images/jerome-and/very-normal-gents.jpg'

const imageHeadline: Image = {
  alt: 'Lorem ipsum dolor',
  src: i,
}

const imageGallery: Image[] = [
  {
    src: a,
  },
  {
    src: b,
  },
  {
    src: c,
  },
  {
    src: d,
  },
]

const imageGallery2: Image[] = [
  {
    src: e,
  },
  {
    src: Image_Show_JeromeAnd_AOB,
  },
  {
    src: g,
  },
  {
    src: h,
  },
]

export { imageGallery, imageGallery2, imageHeadline }
