import _first from 'lodash/first.js'
import _isInteger from 'lodash/isInteger.js'
import _last from 'lodash/last.js'

interface SegmentInfo {
  catchAll: string[]
  hasMeta: boolean
  isIndex: boolean
  segment: string
  segmentCount: number
  slug: string
}

function getSegmentInfo({ SEGMENT, ...props }) {
  const segment = SEGMENT
  const catchAll = [segment]
  // biome-ignore lint/correctness/noUnsafeOptionalChaining: migrate, @typescript-eslint/no-unused-expressions
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)

  const first = _first(catchAll)
  const last = _last(catchAll)

  // biome-ignore lint/correctness/useParseIntRadix: migrate
  const isIndex = first === last || _isInteger(parseInt(last))
  const segmentCount = catchAll.length
  const hasMeta = catchAll.length >= 2

  // // @todo(notion) remove this if possible
  // const segmentOptions = {}
  // if (segment === 'events') {
  //   const isDateRange = catchAll.includes('to')
  //   segmentOptions.isDateRange = isDateRange
  // }

  const segmentInfo: SegmentInfo = {
    catchAll,
    hasMeta,
    isIndex,
    segment,
    segmentCount,
    // segmentOptions,
    slug: `/${catchAll.join('/')}`,
  }

  // console.dir(`> segmentInfo`)
  // console.dir(segmentInfo)

  return segmentInfo
}

export { getSegmentInfo }
export type { SegmentInfo }
