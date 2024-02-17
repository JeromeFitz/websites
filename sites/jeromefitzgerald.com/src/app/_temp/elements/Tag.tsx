import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes'

import type { TagType } from './index'

function Tag({ tag }: { tag: TagType }) {
  return (
    <a href="/playground/layout">
      <Badge
        className={cx('font-mono text-sm', 'capitalize', '')}
        color={tag.color}
        size="2"
        variant="surface"
      >
        {tag.name}
      </Badge>
    </a>
  )
}

export { Tag }
