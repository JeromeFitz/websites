import type { Meta, StoryObj } from '@storybook/react'

import { ButtonLink } from './ButtonLink'

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/ButtonLink',
  component: ButtonLink,
} satisfies Meta<typeof ButtonLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'GOODIE MOB arsenal 0123456789',
    href: 'https://jeromefitzgerald.com/',
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
