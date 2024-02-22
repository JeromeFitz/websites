// import 'server-only'

import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils'
import { asyncForEach } from '@jeromefitz/utils'

import _noop from 'lodash/noop.js'
import _orderBy from 'lodash/orderBy.js'
import _size from 'lodash/size.js'
import { Suspense, cache } from 'react'

import type { PageObjectResponseShow } from '@/app/(notion)/_config/index'

import { getEventData } from '@/app/(notion)/_config/index'

import { RelationLoading } from './index'

function ComponentFallback({ children, ...props }) {
  return <span {...props}>{children}</span>
}

// async function RelationIndividual({ id }) {
// @todo(types)
const RelationIndividual: any = cache(async ({ id }) => {
  // console.dir(`(9) id        ${id}`)
  // return null
  const item: PageObjectResponseShow = await getPageDataFromNotion(id)
  if (!item) return null
  const { properties } = item
  // if (!properties) return null
  const { href, isPublished, title } = getEventData(properties)

  const Component = isPublished ? Anchor : ComponentFallback
  const hrefValue = isPublished ? href : undefined

  const style = cx(
    'inline-block text-base font-normal tracking-tight no-underline lg:text-xl',
    isPublished && 'transition-all duration-200',
    isPublished && 'text-[var(--slate-12)] hover:text-[var(--accent-11)]',
    '',
    '',
  )

  return (
    <>
      <Component className={style} href={hrefValue}>
        {title}
      </Component>
    </>
  )
})

async function RI({ items }) {
  const foo: any = []
  // console.dir(`items: ${_size(items)}`)

  await asyncForEach(items, async (item: any) => {
    // console.dir(`(1) item.id:  ${item.id}`)
    const data: any = await getPageDataFromNotion(item.id)
    // console.dir(`data: ${_size(data)}`)
    if (!data) return
    foo.push(data)
  }).catch(_noop)

  if (_size(foo) === 0) return null
  // if (foo.length === 0) return null

  const bar = _orderBy(foo, [`url`])
  // console.dir(`kjlfdsaklfjdklafjaldkfdalkfjaldsjflkasdkl (${_size(foo)}):`)
  // console.dir(bar)

  return (
    <>
      {bar.map((b, i) => {
        return (
          <li className={cx('mb-2 lg:mb-0.5')} key={`ris-loading-${i}`}>
            {/* <RelationLoading /> */}
            <RelationIndividual id={b?.id} />
          </li>
        )
      })}
    </>
  )
}

function RIS_LOADING({ size }) {
  return (
    <>
      {Array(size)
        .fill(0)
        .map((_, i) => {
          return (
            <li className={cx('mb-2 lg:mb-0.5')} key={`ris-loading-${i}`}>
              <RelationLoading />
            </li>
          )
        })}
    </>
  )
}

function RelationIndividuals({ items }) {
  const itemsCount = _size(items)
  return (
    <>
      <Suspense fallback={<RIS_LOADING size={itemsCount} />}>
        <RI items={items} />
        {/* <RIS_LOADING size={itemsCount} /> */}
      </Suspense>
    </>
  )
}

// function RelationIndividuals({ items }) {
//   const itemsCount = _size(items)
//   return (
//     <>
//       {Array(itemsCount)
//         .fill(0)
//         .map((_, i) => {
//           const item = items[i]
//           const { id } = item

//           return (
//             <li key={id} className={cx('mb-2 lg:mb-0.5')}>
//               <Suspense fallback={<RelationLoading />}>
//                 <RelationIndividual id={id} />
//               </Suspense>
//             </li>
//           )
//         })}
//     </>
//   )
// }

export { RelationIndividual, RelationIndividuals }
