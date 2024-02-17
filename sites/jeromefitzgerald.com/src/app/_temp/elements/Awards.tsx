import { ArchiveIcon, ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Award, Label } from './index'

const awards = [
  {
    body: 'SF Sketchfest',
    icon: <ArrowTopRightIcon />,
    id: 0,
    label: 'JFLE (Jerome & Jesse LE)',
  },
  {
    body: 'Chicago Improv Festival',
    icon: <ArrowTopRightIcon />,
    id: 1,
    label: 'Warp Zone',
  },
  {
    body: 'San Diego Improv Festival',
    icon: <ArchiveIcon />,
    id: 2,
    label: 'Alex O’Jerome, Warp Zone',
  },
  {
    body: 'Pittsburgh Comedy Festival',
    icon: <ArrowTopRightIcon />,
    id: 3,
    label: 'Warp Zone',
  },
  {
    body: 'Steelstacks Comedy Festival',
    icon: <ArchiveIcon />,
    id: 4,
    label: 'Hotel Nowhere, YO! Gloria',
  },
  {
    body: 'New York Musical Improv Festival',
    icon: <ArrowTopRightIcon />,
    id: 5,
    label: 'YO! Gloria',
  },
  {
    body: 'Detroit Improv Festival',
    icon: <ArrowTopRightIcon />,
    id: 6,
    label: 'Alex O‘Jerome',
  },
  {
    body: 'Cast',
    icon: <ArrowTopRightIcon />,
    id: 7,
    label: 'Jerome, Alex, Tunney',
  },
]

function Awards() {
  return (
    <ul className={cx('w-full')}>
      <Label className="font-sans text-3xl font-black uppercase !opacity-100">
        Awards
      </Label>
      {awards.map((award) => {
        return <Award award={award} key={award.id}></Award>
      })}
    </ul>
  )
}

export { Awards }
