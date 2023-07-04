import { getSegmentInfo as _getSegmentInfo } from 'next-notion/src/utils/getSegmentInfo'
import type { SegmentInfo } from 'next-notion/src/utils/getSegmentInfo'
import { cache } from 'react'

const getSegmentInfo = cache(({ SEGMENT, ...props }) => {
  return _getSegmentInfo({ SEGMENT, ...props })
})

export { getSegmentInfo }
export type { SegmentInfo }
