import { create } from '@storybook/theming'

const commonOptions = {
  brandTitle: 'NGOP — Storybook',
  brandUrl: 'https://jeromefitzgerald.com/',
  brandTarget: '_blank',
}

export const light = create({
  base: 'light',
  ...commonOptions,
})

export const dark = create({
  base: 'dark',
  ...commonOptions,
})
