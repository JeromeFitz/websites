import { cx } from '@jeromefitz/ds/utils/cx'

import { IconButton } from '@radix-ui/themes'
import Image from 'next/image'

function Quote({ item }) {
  return (
    <section className={cx('grid h-fit grid-cols-2 grid-rows-1 md:grid-cols-3')}>
      <div className={cx('col-span-3', 'p-6 md:p-12')}>
        <div className={cx('')}>
          <div
            className={cx(
              'text-3xl font-normal md:font-medium',
              'pointer-events-none relative -indent-3',
              'max-w-screen-sm',
              '',
            )}
          >
            <span className={cx('inline', '-ml-2 mb-[-1px] pr-2')}>“</span>
            <p className={cx('inline', 'm-0 p-0')}>{item.content}</p>
            <span className={cx('inline', 'pl-2')}>”</span>
          </div>
          <footer
            className={cx(
              'mt-8',
              'pointer-events-none ml-auto',
              'flex flex-initial flex-row items-center justify-end gap-6',
            )}
          >
            <div
              className={cx(
                'flex flex-initial flex-col items-end justify-start gap-1',
              )}
            >
              <div className={cx('m-0 p-0', 'text-2xl font-semibold')}>
                {item.who}
              </div>
              <div className={cx('m-0 p-0', 'text-lg italic')}>{item.where}</div>
            </div>
            <div className={cx('')}>
              <IconButton
                className={cx('select-none')}
                radius="full"
                // @note(a11y) does not link out so no need for keyboard focus
                tabIndex={-1}
                variant="ghost"
              >
                <Image
                  alt={`Logo for ${item.where}`}
                  className="rounded-full"
                  height="36"
                  src={item.image}
                  width="36"
                />
              </IconButton>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}

export { Quote }
