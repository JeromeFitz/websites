import type { Meta, StoryObj } from '@storybook/react'

// import { cx } from '../../utils/cx'
import { BannerClient } from './Banner.client'

const meta = {
  component: BannerClient,
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Components/BannerClient',
} satisfies Meta<typeof BannerClient>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  argTypes: {},
  args: {
    className: '',
  },
}
