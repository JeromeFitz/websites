import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx.js'

import { VARIANTS } from './Button.constants.js'
import { Button } from './Button.js'

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

export const Custom: Story = {
  ...Default,
  args: {
    ...Default.args,
    className: cx(
      'm-12 p-12',
      'bg-radix-slate12 text-radix-slate1',
      'hocus:bg-radix-slate1 hocus:text-radix-slate12',
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
