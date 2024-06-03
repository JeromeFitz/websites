import {
  BookOpenIcon,
  InfoCircledIcon,
  MusicalNoteIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

// import type { ComponentPropsWithoutRef } from 'react'

import { Lorem } from '@/app/playground/2024/_components/Lorem'

interface SectionType {
  content: any
  icon: any
  id: string
  title: string
}

const sectionsDefault = [
  { content: null, icon: BookOpenIcon, id: 'bio', title: 'Bio' },
  { content: null, icon: InfoCircledIcon, id: 'comedy', title: 'Comedy' },
  { content: null, icon: MusicalNoteIcon, id: 'engineering', title: 'Engineering' },
  { content: null, icon: TicketIcon, id: 'leadership', title: 'Leadership' },
  { content: null, icon: null, id: 'work', title: 'Work' },
]

function SectionLegend({ data }) {
  return (
    <Box className="rounded-3 border-1 border-gray-7">
      {data.map((item, i) => {
        const Icon = item.icon
        return (
          <NextLink
            className={cx(
              ' hocus:bg-accent-4 group relative flex size-full flex-row flex-nowrap items-center justify-start gap-4 overflow-visible p-5 no-underline',
              'border-t-1 border-gray-7 first-of-type:border-t-0',
              '',
            )}
            href={`#${item.id}`}
            key={`legend-${i}`}
          >
            <Box className="relative size-auto flex-none">
              <Box className="contents">
                <Box className="relative flex size-min cursor-pointer flex-row flex-nowrap items-center justify-start gap-3 overflow-visible p-0">
                  <Box className="rounded-3 bg-accent-9 flex size-8 flex-row flex-nowrap items-center justify-center">
                    <Box className={cx('text-white dark:text-black')}>
                      {!!item.icon ? (
                        <Icon className="!size-4" />
                      ) : (
                        <Code variant="ghost">{i}</Code>
                      )}
                    </Box>
                  </Box>
                  <Box className="">{item.title}</Box>
                </Box>
              </Box>
            </Box>
          </NextLink>
        )
      })}
    </Box>
  )
}

function SectionContent({ data }) {
  return (
    <>
      {data.map((item, i) => {
        const Icon = item.icon
        return (
          <section
            className={cx('flex w-full flex-col gap-14', 'scroll-mt-[100px]')}
            id={`${item.id}`}
            key={`section--${item.id}`}
          >
            <Box
              className={cx(
                'relative flex h-min w-full flex-row flex-nowrap items-center justify-start gap-8 self-start overflow-hidden p-0',
                'after:border-t-1 after:border-accent-9 after:pointer-events-none after:absolute after:left-0 after:top-0 after:size-full after:content-[""]',
              )}
            >
              <Box
                className={cx(
                  'bg-accent-9 rounded-b-3',
                  'flex aspect-[1_/_1] size-10 flex-none flex-nowrap items-center justify-center gap-0 overflow-visible p-0',
                )}
              >
                <Box
                  className={cx(
                    'flex shrink-0 transform-none flex-col items-center justify-center outline-none',
                    'relative line-clamp-1 h-full w-[1px] flex-[1_0_0px]',
                  )}
                >
                  <Heading as="h3" className={cx('text-white dark:text-black')}>
                    {!!item.icon ? (
                      <Icon className="!size-6" />
                    ) : (
                      <Code variant="ghost">{i}</Code>
                    )}
                  </Heading>
                </Box>
              </Box>
              <Box
                className={cx(
                  'relative flex h-full w-[1px] flex-[1_0_0px] flex-row flex-nowrap content-center items-center justify-start gap-0 overflow-visible p-0',
                )}
              >
                <Box
                  className={cx(
                    'flex shrink-0 transform-none flex-col items-start justify-start outline-none',
                    'relative line-clamp-1 h-full w-[1px] flex-[1_0_0px]',
                    'pt-1.5',
                  )}
                >
                  <Heading as="h2" className={cx('')}>
                    {item.title}
                  </Heading>
                </Box>
              </Box>
            </Box>
            <Box className="w-full">
              <Box className="max-w-screen-sm">
                {!!item.content ? item.content : <Lorem />}
              </Box>
            </Box>
          </section>
        )
      })}
    </>
  )
}

function Section({ sections = sectionsDefault }: { sections?: SectionType[] }) {
  return (
    <>
      <Box
        className={cx(
          'flex w-full flex-col md:flex-row',
          'gap-[var(--sidebar-gap)]',
          '',
        )}
      >
        <Box
          className={cx(
            // 'bg-purple-6 rounded-3 border-1',
            'col-span-3',
            'hidden md:block',
            '!md:w-[var(--sidebar-width)] w-full md:min-w-[var(--sidebar-width)] md:max-w-[var(--sidebar-width)]',
            '',
          )}
        >
          <Box
            className={cx(
              // 'bg-purple-9 rounded-3 border-1 min-h-[280px]',
              'sticky top-24',
            )}
          >
            <Box
              className={cx(
                'rounded-3 absolute inset-x-0 top-0 z-0 h-16 flex-none overflow-hidden',
                'hidden',
              )}
              data-name="Legend: Highlight"
            />
            <SectionLegend data={sections} />
          </Box>
        </Box>
        <Box className="flex w-full flex-col gap-24">
          <SectionContent data={sections} />
        </Box>
      </Box>
    </>
  )
}

export type { SectionType }
export { Section, SectionContent, SectionLegend }
