'use client'
/* eslint-disabdle tailwindcss/no-custom-classname */

import { ExternalLinkIcon } from '@jeromefitz/ds/components/Icon/index'
import { Tags } from '@jeromefitz/ds/components/Section/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/Accordion'

const description = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, omnis? Quod, enim fugit doloribus qui culpa odit. Eveniet, cupiditate qui alias nihil similique tempora fugit?`

function AccordionClient({ defaultValue, items }) {
  return (
    <Box
      asChild
      className="border-accentA-12 shadow-3 bg-grayA-6 border-0 border-solid"
      maxWidth="100%"
      minWidth="100%"
      mt="4"
      width="300px"
    >
      <AccordionRoot collapsible defaultValue={defaultValue} type="single">
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
            <AccordionItem key={key} value={id}>
              <AccordionTrigger>
                <Flex
                  align="center"
                  className="hover:cursor-pointer"
                  justify="start"
                  my="4"
                  px="2"
                  py="4"
                  width="100%"
                >
                  <Flex
                    align="center"
                    className="grow-0 text-left"
                    minWidth="0"
                    width={{ initial: '70%', lg: '66.666667%', md: '75%' }}
                  >
                    <Text className="line-clamp-2" size={{ initial: '2', md: '4' }}>
                      {title}
                    </Text>
                  </Flex>
                  <Flex
                    className="text-left"
                    px="2"
                    width={{ initial: '30%', lg: '33.333333%', md: '25%' }}
                  >
                    <Text
                      as="span"
                      className="visible inline md:invisible md:hidden"
                      size="1"
                    >
                      {dayOfWeekAbbr?.toUpperCase()}, {month}/{dayOfMonth}
                      <br />
                      {time}
                    </Text>
                    <Text
                      as="span"
                      className="invisible hidden md:visible md:inline"
                      size="2"
                    >
                      {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
                      <br />@ {time}
                    </Text>
                  </Flex>
                </Flex>
              </AccordionTrigger>
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
                        'gap-2',
                      )}
                    >
                      <Button
                        aria-label={`Read more detailed information for ${title}`}
                        asChild
                        className={cx('justify-center')}
                        variant="solid"
                      >
                        <NextLink href={href}>Detailed Info</NextLink>
                      </Button>
                      {!!ticketUrl && !isEventOver && (
                        <Button
                          asChild
                          className={cx(
                            'flex-row items-center justify-center gap-1',
                          )}
                          variant="surface"
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
      </AccordionRoot>
    </Box>
  )
}

export { AccordionClient }
