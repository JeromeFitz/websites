/**
 * @hack(next) delete this and use scrollMarginTop + scroll-behavior
 */
// 'use client'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
// const scrollIntoViewWithOffset = (selector, offset) => {
//   const element = document.getElementById(selector)

//   if (element) {
//     window.scrollTo({
//       behavior: 'smooth',
//       top:
//         element.getBoundingClientRect().top -
//         document.body.getBoundingClientRect().top -
//         offset,
//     })
//   }
// }

function SectionClientLegend({ data }) {
  return (
    <>
      {data.map((item, i) => {
        return (
          <Box className="relative z-10 h-16 w-full flex-none" key={`legend-${i}`}>
            <NextLink
              href={`#${item.id}`}
              // onClick={(e) => {
              //   e.preventDefault()
              //   scrollIntoViewWithOffset(`${item.id}`, 100)
              // }}
            >
              {item.title}
            </NextLink>
          </Box>
        )
      })}
    </>
  )
}

export { SectionClientLegend }
