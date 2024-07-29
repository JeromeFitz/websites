import type { Meta, StoryObj } from '@storybook/react'

// import { cx } from '../../utils/cx'
import { BannerClient } from './Banner.client'

const meta = {
  component: BannerClient,
  // @todo(eslint) storybook/no-title-property-in-meta
  title: 'Components/BannerClient',
} satisfies Meta<typeof BannerClient>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: '',
  },
  argTypes: {},
}
