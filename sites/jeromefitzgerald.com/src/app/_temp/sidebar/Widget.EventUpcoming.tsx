import { cx } from '@jeromefitz/ds/utils/cx'

import { IconButton } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

import { Skeleton } from '~components/Skeleton'

function WidgetEventUpcoming({ icon, subtitle, title }) {
  const [loading, setLoading] = useState(true)
  const WidgetIcon = icon

  /**
   * @todo(swr) hack for fake loading right now
   */
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _title = title.split('–')
  const hasSplit = title.split('–')?.length > 1

  return (
    <div className="grid gap-[0.5rem] p-1">
      <div
        className={cx('relative flex w-fit items-center gap-4', 'text-sm', 'group')}
        onClick={() => setLoading((l) => !l)}
      >
        {loading ? (
          <Skeleton className="size-full min-h-[var(--space-5)] min-w-[var(--space-5)]" />
        ) : (
          <IconButton radius="large" size="1" tabIndex={-1}>
            <WidgetIcon className="flex size-full items-center justify-center" />{' '}
          </IconButton>
        )}

        <div
          className={cx(
            'flex flex-col',
            'before:absolute before:inset-0 before:content-["_"]',
            'place-content-center',
          )}
        >
          {loading ? (
            <Skeleton className="size-full min-h-[var(--space-5)] min-w-[calc(var(--space-9)_*_4.7)] md:min-w-[calc(var(--space-9)_*_2.5)]" />
          ) : (
            <p className="font-mono text-sm font-bold">{subtitle}</p>
          )}
        </div>
      </div>
      {loading ? (
        <>
          <Skeleton className="size-full min-h-[1.25rem]" />
          <Skeleton className="size-full min-h-[1.25rem]" />
        </>
      ) : (
        <p className="line-clamp-2 min-h-[2.95rem] font-mono text-base font-semibold">
          {hasSplit ? (
            <>
              {_title[0]}
              <br />– {_title[1]}
            </>
          ) : (
            <>{title}</>
          )}
        </p>
      )}
    </div>
  )
}

export { WidgetEventUpcoming }
