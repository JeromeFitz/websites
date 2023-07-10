import 'server-only'

import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/src/notion/utils'
import { asyncForEach } from '@jeromefitz/utils'
import _noop from 'lodash/noop'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import { cache, Suspense } from 'react'

import type { PageObjectResponseShow } from '~app/(notion)/_config'
import { getEventData } from '~app/(notion)/_config'

import { RelationLoading } from './index'

function ComponentFallback({ children, ...props }) {
  return <span {...props}>{children}</span>
}

// async function RelationIndividual({ id }) {
const RelationIndividual = cache(async ({ id }) => {
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
    'inline-block text-base font-normal tracking-tight no-underline md:text-xl',
    isPublished && 'transition-all duration-200',
    isPublished && 'text-radix-slate12 hover:text-radix-pink11',
    '',
    ''
  )

  return (
    <>
      <Component href={hrefValue} className={style}>
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
          <li key={`ris-loading-${i}`} className={cx('mb-2 md:mb-0.5')}>
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
            <li key={`ris-loading-${i}`} className={cx('mb-2 md:mb-0.5')}>
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
//             <li key={id} className={cx('mb-2 md:mb-0.5')}>
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
