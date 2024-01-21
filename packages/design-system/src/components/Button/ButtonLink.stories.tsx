import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx.js'

import { ButtonLink } from './ButtonLink.js'

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/ButtonLink',
  component: ButtonLink,
} satisfies Meta<typeof ButtonLink>

export default meta

type Story = StoryObj<typeof meta>

const values = {
  href: 'https://jeromefitzgerald.com',
  link: { name: 'GOODIE MOB arsenal 0123456789' },
}

export const Default: Story = {
  args: {
    children: values.link.name,
    href: values.href,
    target: '_blank',
    className: cx(),
  },
}

export const Primary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'primary',
  },
}

export const Text: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'text',
  },
}
