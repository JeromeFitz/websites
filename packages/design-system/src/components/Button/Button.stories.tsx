import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx'
import { Button } from './Button'
import { VARIANTS } from './Button.constants'

const meta = {
  component: Button,
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const values = {
  button: { name: 'GOODIE MOB arsenal 0123456789' },
}

export const Default: Story = {
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
  args: {
    children: values.button.name,
    className: cx(),
  },
}

export const Empty: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'empty',
  },
}

export const Custom: Story = {
  ...Default,
  args: {
    ...Default.args,
    className: cx(
      'm-12 p-12',
      'bg-gray-12 text-gray-1',
      'hocus:bg-gray-1 hocus:text-gray-12',
    ),
    variant: 'empty',
  },
}

export const Ghost: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: VARIANTS.GHOST,
  },
}

export const Primary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: VARIANTS.PRIMARY,
  },
}

export const Secondary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: VARIANTS.SECONDARY,
  },
}

export const Tertiary: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: VARIANTS.TERTIARY,
  },
}

export const Text: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: VARIANTS.TEXT,
  },
}
