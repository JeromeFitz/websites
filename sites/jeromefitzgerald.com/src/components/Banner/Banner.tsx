import { memo } from 'react'

import { BannerClient } from './Banner.client'

const BannerClientMemoized = memo(BannerClient)

function Banner() {
  return <BannerClientMemoized />
}

export { Banner }
