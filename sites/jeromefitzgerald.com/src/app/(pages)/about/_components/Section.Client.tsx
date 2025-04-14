import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import NextLink from 'next/link'

function SectionClientLegend({ data }: { data: any }) {
  return (
    <>
      {data.map((item: any, i: number) => {
        return (
          <Box
            className="z-10"
            height="calc(var(--spacing) * 16)"
            key={`legend-${i}`}
            position="relative"
            width="100%"
          >
            <NextLink href={`#${item.id}`}>{item.title}</NextLink>
          </Box>
        )
      })}
    </>
  )
}

export { SectionClientLegend }
