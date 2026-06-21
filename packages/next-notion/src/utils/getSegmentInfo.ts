import { first as _first, isInteger as _isInteger, last as _last } from "lodash-es";

interface SegmentInfo {
  catchAll: string[];
  hasMeta: boolean;
  isIndex: boolean;
  segment: string;
  segmentCount: number;
  slug: string;
}

function getSegmentInfo({ SEGMENT, ...props }) {
  const segment = SEGMENT;
  const catchAll = [segment];
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll);

  const first = _first(catchAll);
  const last = _last(catchAll);

  const isIndex = first === last || _isInteger(parseInt(last));
  const segmentCount = catchAll.length;
  const hasMeta = catchAll.length >= 2;

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
    slug: `/${catchAll.join("/")}`,
  };

  // console.dir(`> segmentInfo`)
  // console.dir(segmentInfo)

  return segmentInfo;
}

export type { SegmentInfo };
export { getSegmentInfo };
