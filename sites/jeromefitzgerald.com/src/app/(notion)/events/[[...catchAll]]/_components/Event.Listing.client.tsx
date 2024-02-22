'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ExternalLinkIcon } from '@jeromefitz/ds/components/Icon/index'
import { Tags } from '@jeromefitz/ds/components/Section/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as Accordion from '@radix-ui/react-accordion'
import { Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'

const description = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, omnis? Quod, enim fugit doloribus qui culpa odit. Eveniet, cupiditate qui alias nihil similique tempora fugit?`

function AccordionClient({ defaultValue, items }) {
  return (
    // @ts-ignore
    <Accordion.Root
      className={cx(
        'mt-10 min-w-full max-w-full',
        'w-[300px] rounded-md bg-[var(--mauve-6)]',
        'shadow-[0_2px_10px] shadow-black/5 dark:shadow-white/10',
        'border-1 border-black/5 dark:border-white/10',
      )}
      collapsible
      // @ts-ignore
      defaultValue={defaultValue}
      type="single"
    >
      {items.map((item) => {
        if (!item.id) return null
        // const { properties } = item
        // const {
        //   dayOfWeek,
        //   dayOfWeekAbbr,
        //   dayOfMonth,
        //   dayOfMonthOrdinal,
        //   month,
        //   monthName,
        //   href,
        //   seoDescription,
        //   title,
        //   time,
        //   ticketUrl,
        // } = getEventData(properties)
        const {
          dayOfMonth,
          dayOfMonthOrdinal,
          dayOfWeek,
          dayOfWeekAbbr,
          href,
          id,
          isEventOver,
          month,
          monthName,
          seoDescription,
          tags,
          ticketUrl,
          time,
          title,
        } = item
        // const dateMobile = `${dayOfWeekAbbr.toUpperCase()}, ${month}/${dayOfMonth}<br/>${time}`

        const key = `items-item-${id}`
        return (
          // @note(types) Property 'value' does not exist on type
          // @ts-ignore
          <AccordionItem key={key} value={id}>
            {/* @ts-ignore */}
            <AccordionTrigger>
              <div className="flex w-full flex-row items-center justify-start px-2 hover:cursor-pointer">
                <div className="flex w-6/12 min-w-0 grow-0 items-center text-left  font-bold leading-tight md:w-9/12 lg:w-8/12">
                  <p className="line-clamp-2 font-sans">{title}</p>
                </div>
                <div className="w-6/12 px-2 text-right font-mono text-xs font-medium leading-tight md:w-3/12 lg:w-4/12">
                  <span className="visible inline lg:invisible lg:hidden">
                    {dayOfWeekAbbr?.toUpperCase()}, {month}/{dayOfMonth}
                    <br />
                    {time}
                  </span>
                  <span className="invisible hidden lg:visible lg:inline">
                    {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
                    <br />@ {time}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            {/* @ts-ignore */}
            <AccordionContent>
              <div className="flex flex-row flex-wrap">
                <div className="mb-2 w-full pb-2 md:mb-4 md:pb-4">
                  <p className="">{seoDescription || description}</p>
                </div>
                <div className="flex w-full flex-row flex-wrap justify-center md:flex-nowrap">
                  <div className="w-full justify-start px-4 text-left md:-mt-4">
                    <Tags classNameTag="px-3 py-2 mb-4 mr-4" tags={tags} />
                  </div>
                  <div
                    className={cx(
                      // 'items-center align-middle',
                      'mr-1 w-full justify-end text-right md:w-6/12 lg:mr-4',
                      'flex flex-col',
                    )}
                  >
                    <Button
                      aria-label={`Read more detailed information for ${title}`}
                      asChild
                      className={cx('justify-center')}
                    >
                      <NextLink href={href}>Detailed Info</NextLink>
                    </Button>
                    {!!ticketUrl && !isEventOver && (
                      <Button
                        asChild
                        className={cx('flex-row items-center justify-center gap-1')}
                      >
                        <NextLink href={ticketUrl}>
                          <>Buy Tickets</>
                          <ExternalLinkIcon />
                        </NextLink>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion.Root>
  )
}

export { AccordionClient }
