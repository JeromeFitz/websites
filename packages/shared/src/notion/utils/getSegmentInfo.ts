import { getSegmentInfo as _getSegmentInfo } from 'next-notion/utils/index'
// @todo(types) next-notion
// import type { SegmentInfo } from 'next-notion/utils/index'
import { cache } from 'react'

const getSegmentInfo: any = cache(({ SEGMENT, ...props }) => {
  return _getSegmentInfo({ SEGMENT, ...props })
})

export { getSegmentInfo }
// export type { SegmentInfo }
