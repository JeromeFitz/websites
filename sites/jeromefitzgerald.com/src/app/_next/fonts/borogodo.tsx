import localFont from 'next/font/local'

import { cx } from '@/utils/cx'

const borogodo = localFont({
  src: [
    {
      path: 'https://cdn.jeromefitzgerald.com/fonts/borogodo/0.2/BorogodoV0.2-BlackS.woff2',
      style: 'normal',
      weight: '400',
    },
  ],
})

console.dir(`> borogodo:`)
console.dir(borogodo)

const fonts = cx(borogodo.className)

export { fonts }
