import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx'

import { Button } from './Button'

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const values = {
  button: { name: 'GOODIE MOB arsenal 0123456789' },
}

export const Default: Story = {
  args: {
    children: values.button.name,
    className: cx(),
  },
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
}

export const Empty: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'empty',
  },
}

export const Primary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'tertiary',
  },
}

export const Text: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'text',
  },
}
