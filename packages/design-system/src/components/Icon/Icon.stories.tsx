import type { Meta, StoryObj } from '@storybook/react'

import { cx } from '../../utils/cx.js'

import { MapIcon } from './Icon.js'

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/Icon',
  component: MapIcon,
} satisfies Meta<typeof MapIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: cx(),
  },
  argTypes: {},
}
