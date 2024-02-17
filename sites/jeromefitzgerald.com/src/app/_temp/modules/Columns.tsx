import { cx } from '@jeromefitz/ds/utils/cx'

import { Awards, RichText } from '~app/_temp/elements'
import { ModuleColumn, ModuleRow } from '~app/_temp/modules'

const text =
  'A one-of-a-kind surreal musical from one of the choicest films of all-time. Staged to sold-out houses a few times in 2017.'

function Columns() {
  return (
    <>
      <ModuleRow
        className={cx(
          '[--cl:2]',
          '[--pbd-row:10rem]',
          '[--ptm-row:3rem] [--row-gap:20px]',
        )}
      >
        <ModuleColumn
          className={cx(
            'md:w-[calc(var(--cols)*(min(var(--grid-cols),_4))_-_var(--gutter))]',
          )}
        >
          <></>
        </ModuleColumn>
        <ModuleColumn>
          <Awards />
        </ModuleColumn>
      </ModuleRow>
      {/*  */}
      <ModuleRow
        className={cx(
          '[--cl:2]',
          '[--pbd-row:7.5rem] [--ptd-row:7.5rem]',
          '[--ptm-row:3rem] [--row-gap:60px]',
        )}
      >
        <ModuleColumn
          className={cx(
            'md:w-[calc(var(--cols)*(min(var(--grid-cols),_4))_-_var(--gutter))]',
          )}
        >
          <RichText label="One" text={text} />
        </ModuleColumn>
        <ModuleColumn>
          <RichText label="Two" text={text} />
        </ModuleColumn>
      </ModuleRow>
      {/*  */}
      <ModuleRow
        className={cx(
          '[--cl:2]',
          '[--pbd-row:10rem]',
          '[--ptm-row:3rem] [--row-gap:20px]',
        )}
      >
        <ModuleColumn
          className={cx(
            'md:w-[calc(var(--cols)*(min(var(--grid-cols),_4))_-_var(--gutter))]',
          )}
        >
          <></>
        </ModuleColumn>
        <ModuleColumn>
          <RichText label="Three" text={text} />
        </ModuleColumn>
      </ModuleRow>
      {/*  */}
      <ModuleRow
        className={cx(
          '[--cl:2]',
          '[--pbd-row:7.5rem] [--ptd-row:7.5rem]',
          '[--ptm-row:3rem] [--row-gap:60px]',
        )}
      >
        <ModuleColumn
          className={cx(
            'md:w-[calc(var(--cols)*(min(var(--grid-cols),_4))_-_var(--gutter))]',
          )}
        >
          <RichText label="Four" text={text} />
        </ModuleColumn>
        <ModuleColumn>
          <></>
        </ModuleColumn>
      </ModuleRow>
    </>
  )
}

export { Columns }
