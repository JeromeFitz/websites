import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'GOODIE MOB arsenal 0123456789',
  },
  argTypes: {
    onClick: {
      action: 'onClick',
    },
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
