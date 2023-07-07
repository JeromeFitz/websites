import { cx } from '@jeromefitz/shared/src/utils/cx'
import type { Meta, StoryObj } from '@storybook/react'

import { MapIcon } from './Icon'

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
