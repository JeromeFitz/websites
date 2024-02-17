import { cx } from '@jeromefitz/ds/utils/cx'

import { useRef } from 'react'

import { ModuleColumn, ModuleRow, ModuleWidget } from '~app/_temp/modules'

function Module({ options }) {
  const ref: any = useRef(null)
  return (
    <>
      <ModuleRow>
        <ModuleWidget options={options} refPass={ref} />
        <ModuleColumn refPass={ref}>
          <div className={cx('w-full md:relative')}>
            <div
              className={cx(
                'mb-2 text-3xl font-black tracking-tight md:mb-4 md:text-6xl md:tracking-tight',
              )}
            >
              <h2>G0: {options?.headline}</h2>
            </div>
            <div className={cx('text-2xl tracking-tight md:text-3xl')}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt porro
                dolorem voluptate cupiditate, enim dignissimos, quae quam modi
                aliquam nostrum fugiat repellat ullam nulla? Debitis sit perferendis
                consectetur quos! Distinctio et, dolor suscipit aut facere
                reprehenderit eveniet mollitia vero saepe eligendi at, numquam sequi
                illo architecto voluptate ipsum ducimus assumenda!
              </p>
            </div>
          </div>
        </ModuleColumn>
      </ModuleRow>
    </>
  )
}

export { Module }
