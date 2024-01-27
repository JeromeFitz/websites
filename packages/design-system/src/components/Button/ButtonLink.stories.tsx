import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx'
import { ButtonLink } from './ButtonLink'

const meta = {
  component: ButtonLink,
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/ButtonLink',
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
    className: cx(),
    href: values.href,
    target: '_blank',
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
