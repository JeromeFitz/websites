import { create } from 'storybook/theming'

const commonOptions = {
  brandTarget: '_blank',
  brandTitle: 'NGOP — Storybook',
  brandUrl: 'https://jeromefitzgerald.com/',
}

export const light = create({
  base: 'light',
  ...commonOptions,
})

export const dark = create({
  base: 'dark',
  ...commonOptions,
})
