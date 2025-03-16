import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ExternalLinkIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Lorem } from '@/app/playground/2024/_components/Lorem'
import { LI, UL } from '@/components/List/index'
import { socials } from '@/data/socials'
interface SectionType {
  content: any
  icon: any
  id: string
  title: string
}

function Bio() {
  return (
    <>
      <Text>
        <Em>“I must confess, I was born at a very early age.” – Groucho Marx</Em>
        <br /> <br />
      </Text>
      <Text>Ah yes, the dreaded bio section. Well, polite pass for now.</Text>
    </>
  )
}

function Comedy() {
  return (
    <>
      <Text className="hidden">
        <Em>“Comedy is tragedy - plus time.” – Carol Burnett</Em>
        <br />
        <br />
      </Text>
      <Text>
        For the past <Code variant="ghost">10+</Code> years I’ve been directing,
        producing, writing, and performing sketch comedy, musicals, and improv. Feel
        free to check some out in the{' '}
        <Link asChild>
          <NextLink href="/shows">Shows section</NextLink>
        </Link>
        .
      </Text>
      <br />
      <br />
      <Text>
        Based in <Strong>Pittsburgh, PA</Strong> I’ve had shows in <Em>Chicago</Em>,{' '}
        <Em>Cleveland</Em>, <Em>Detroit</Em>, <Em>New York City</Em>,{' '}
        <Em>Philadelphia</Em>, <Em>San Diego</Em>, <Em>San Francisco</Em>, and more.
      </Text>
      <br />
      <br />
      <Text>
        Perhaps you have seen me in commercials for <Em>AT&T</Em>, <Em>Google</Em>,
        or <Em>Sucrets</Em>. On the jumbotron before games for the{' '}
        <Em>Pittsburgh Pirates</Em> at PNC Park. Or featured in{` `}
        <Em>The Onion</Em>. (It’s okay if not though.)
      </Text>
      <Separator my="4" orientation="horizontal" size="4" />
      <Text size="1">
        I’ve also been extremely fortunate to take courses from some of the funniest
        people in the comedy world and as a result – <Strong>thee world</Strong>:
        <br />
        <Em>Craig Cackowski</Em>, <Em>Kevin McDonald</Em>, <Em>Jaime Moyer</Em>,{' '}
        <Em>Christine Nangle</Em>, <Em>Natalie Palamides</Em>, <Em>Rich Talarico</Em>
        , <Em>Reggie Watts</Em>, and “more”!
      </Text>
    </>
  )
}

function Contact() {
  return (
    <>
      <Callout size="1" variant="surface">
        This has not been migrated yet.
      </Callout>
      <ul
        className={cx(
          'mx-2 mt-2 pt-2',
          'flex flex-row gap-8 md:gap-4',
          'justify-center',
          'md:place-items-baseline md:items-center md:justify-start',
        )}
      >
        {socials.map((social) => {
          if (!social.active) return null

          return (
            <li className={cx('')} key={`footer--social--${social.id}`}>
              <Button asChild highContrast radius="full" size="2" variant="ghost">
                <a
                  className={cx(
                    'hover:cursor-pointer lg:flex',
                    'text-gray-12 hover:text-gray-12',
                    // 'duration-250 transition-colors',
                    'place-content-start items-center justify-items-start lg:w-full',
                    social.className,
                  )}
                  href={social.url}
                  target="_blank"
                >
                  {social.icon}
                  <span
                    className={cx(
                      // 'flex flex-row items-center justify-center gap-2',
                      'hidden',
                      '',
                    )}
                  >
                    <span className="text-inherit">{social.title}</span>{' '}
                    <ExternalLinkIcon className="text-gray-12" />
                  </span>
                </a>
              </Button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function Engineering() {
  return (
    <>
      <Text className="hidden">
        <Em>
          “Work hard, be kind, and amazing things will happen.” – Conan O’Brien
        </Em>
        <br />
        <br />
      </Text>
      <Text>
        I navigate complex technical challenges that align with organizational goals
        through workflow optimization. I do this by focusing on a collaborative
        culture of shared understanding that creates and maintains high-performing
        departments that highlight continuous improvement and engineering excellence.
        <br />
        <br />
        My focus is on consistently shipping products that are secure and reliable at
        scale. My drive as an engineering leader is to equally scale the impact of
        those I've been entrusted to lead. I encourage and grow next generation
        leaders and seek to recognize, foster, and retain talent.
        <br />
        <br />
        <Em>
          People emulate their leaders. I hold myself accountable as the example I
          want to follow.
        </Em>
      </Text>
      <Separator my="4" orientation="horizontal" size="3" />
      <Text>
        I co-founded{' '}
        <Link asChild>
          <NextLink href="https://emplified.com">Emplified</NextLink>
        </Link>{' '}
        (<Em>rip</Em>), and am currently doing international business things at a
        company made famous by Paul Rand (and for their{' '}
        <Em>international business machinery</Em>).
        <br />
        <br />
        I’ve also worked with Fortune 100, start-ups, and everywhere in-between.
        Leading initiatives and teams through{' '}
        <Link asChild>
          <NextLink href="https://www.luma-institute.com/about-luma/luma-system-explore-methods">
            human centered design methods
          </NextLink>
        </Link>{' '}
        so all facets of the business are clear on what defines done and how together
        we can share responsibility, success, and grow in a positive manner as a
        collective and individuals.
      </Text>
      <Separator my="4" orientation="horizontal" size="4" />
      <Text size="1">
        All kidding aside on most of this website, I do have an ability to take
        things seriously.
        <br />
        <Em>(And have a good time while doing so.)</Em>
      </Text>
    </>
  )
}

function NonProfit() {
  return (
    <>
      <Text className="hidden">
        <Em>
          “Work hard, be kind, and amazing things will happen.” – Conan O’Brien
        </Em>
        <br />
        <br />
      </Text>
      <Text>
        Outside of ‘traditional work’ I have been fortunate enough to volunteer in
        the nonprofit sector:
      </Text>
      <br />
      <br />
      <UL>
        <LI>
          <Text>
            Arcade Comedy Theater 501(c)(3), founding Leaderboard Member
            (2014–Present)
          </Text>
        </LI>
        <LI>
          <Text>
            Comedy Arts Pittsburgh 501(c)(3), co-founder, Pittsburgh Comedy Festival
            (2013–2016)
          </Text>
        </LI>
        <LI>
          <Text>Side Project Inc. 501(c)(3), founding Team Member (2012–2014)</Text>
        </LI>
        <LI>
          <Text>
            American Heart Association 501(c)(3), Worldwide Charter Member
            (2006–2012)
          </Text>
        </LI>
      </UL>
      <Separator my="4" orientation="horizontal" size="4" />
      <Text size="1">
        As well as organizing and/ or performing in benefits for:
        <br />
        <Em>
          Animal Friends, Animal Rescue League, Casa San José, Greater Pittsburgh
          Community Foodbank, Leukemia and Lymphoma Society, New Voices for
          Reproductive Justice, Patrick O’Brien Foundation, Planned Parenthood,
          Shepherd’s Heart Veterans Home, SisTers PGH, Steps To Independence, Wounded
          Warriors, & more
        </Em>
      </Text>
    </>
  )
}

const sectionsDefault = [
  { content: <Bio />, icon: null, id: 'bio', title: 'Bio' },
  { content: <Comedy />, icon: null, id: 'comedy', title: 'Comedy' },
  {
    content: <Engineering />,
    icon: null,
    id: 'engineering',
    title: 'Engineering',
  },
  { content: <NonProfit />, icon: null, id: 'non-profit', title: 'NonProfit' },
  { content: <Contact />, icon: null, id: 'contact', title: 'Contact' },
]

function Section({ sections = sectionsDefault }: { sections?: SectionType[] }) {
  return (
    <>
      <Flex
        direction={{ initial: 'column', md: 'row' }}
        gap="var(--sidebar-gap)"
        mb="12"
        width="100%"
      >
        <Grid
          className={cx(
            // 'bg-purple-6',
            // 'rounded-3 border-1',
            '!col-span-3',
          )}
          // columns="3"
          display={{ initial: 'none', md: 'grid' }}
          maxWidth={{ md: 'var(--sidebar-width)' }}
          minWidth={{ md: 'var(--sidebar-width)' }}
          width={{ initial: '100%', md: 'var(--sidebar-width)' }}
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
        </Grid>
        <Flex direction="column" gap="9" width="100%">
          <SectionContent data={sections} />
        </Flex>
      </Flex>
    </>
  )
}

function SectionContent({ data }) {
  return (
    <>
      {data.map((item, i) => {
        const Icon = item.icon
        return (
          <Flex
            asChild
            className="scroll-mt-[100px] border-none"
            direction="column"
            gap="12"
            key={`section--${item.id}`}
            width="100%"
          >
            <section id={`${item.id}`}>
              <Flex
                className={cx(
                  'items-center self-start overflow-hidden',
                  'after:border-accent-9 after:pointer-events-none after:absolute after:top-0 after:left-0 after:size-full after:border-t-1 after:content-[""]',
                )}
                column="row"
                gap="3"
                height="min-content"
                justify="start"
                mb="2"
                p="0"
                position="relative"
                width="100%"
                wrap="nowrap"
              >
                <Flex
                  className="bg-accent-9 rounded-b-3 aspect-[1_/_1] items-center overflow-visible"
                  gap="0"
                  height="calc(var(--spacing) * 10)"
                  justify="center"
                  p="0"
                  width="calc(var(--spacing) * 10)"
                  wrap="nowrap"
                >
                  <Flex
                    className="line-clamp-1 transform-none items-center outline-hidden"
                    direction="column"
                    flexBasis="0x"
                    flexGrow="1"
                    flexShrink="0"
                    height="100%"
                    justify="center"
                    position="relative"
                    width={{ initial: '1px', md: '1px' }}
                  >
                    <Heading as="h3" className={cx('text-white dark:text-black')}>
                      {item.icon ? (
                        <Icon className="!size-6" />
                      ) : (
                        <Code variant="ghost">{i + 1}</Code>
                      )}
                    </Heading>
                  </Flex>
                </Flex>
                <Flex
                  className="content-center items-center overflow-visible"
                  direction="row"
                  flexBasis="0x"
                  flexGrow="1"
                  flexShrink="0"
                  gap="0"
                  height="100%"
                  justify="start"
                  p="0"
                  position="relative"
                  width={{ initial: '1px', md: '1px' }}
                  wrap="nowrap"
                >
                  <Flex
                    className="line-clamp-1 transform-none items-start outline-hidden"
                    direction="column"
                    flexBasis="0px"
                    flexGrow="1"
                    flexShrink="0"
                    height="100%"
                    justify="start"
                    position="relative"
                    pt="2"
                    width={{ initial: '1px', md: '1px' }}
                  >
                    <Heading as="h2" className={cx('')}>
                      {item.title}
                    </Heading>
                  </Flex>
                </Flex>
              </Flex>
              <Box width="100%">
                <Box className="max-w-screen-sm">
                  {item.content ? item.content : <Lorem />}
                </Box>
              </Box>
            </section>
          </Flex>
        )
      })}
    </>
  )
}

function SectionLegend({ data }) {
  return (
    <Box className="border-gray-7 rounded-3 border-1">
      {data.map((item, i) => {
        const Icon = item.icon
        return (
          <Flex
            asChild
            className={cx(
              'hover:bg-accent-4 group items-center overflow-visible no-underline',
              'border-gray-7 border-t-1 first-of-type:border-t-0',
              '',
            )}
            direction="row"
            gap="4"
            height="100%"
            justify="start"
            key={`legend-${i}`}
            p="5"
            position="relative"
            width="100%"
            wrap="nowrap"
          >
            <NextLink href={`#${item.id}`}>
              <Box className="relative size-auto flex-none">
                <Box className="contents">
                  <Flex
                    className="cursor-pointer items-center overflow-visible"
                    direction="row"
                    gap="3"
                    height="min-content"
                    justify="start"
                    p="0"
                    position="relative"
                    width="min-content"
                    wrap="nowrap"
                  >
                    <Flex
                      className="rounded-3 bg-accent-9 items-center"
                      direction="row"
                      height="calc(var(--spacing) * 8)"
                      justify="center"
                      width="calc(var(--spacing) * 8)"
                      wrap="nowrap"
                    >
                      <Box className={cx('text-white dark:text-black')}>
                        {item.icon ? (
                          <Icon className="!size-4" />
                        ) : (
                          <Code variant="ghost">{i + 1}</Code>
                        )}
                      </Box>
                    </Flex>
                    <Box className="">{item.title}</Box>
                  </Flex>
                </Box>
              </Box>
            </NextLink>
          </Flex>
        )
      })}
    </Box>
  )
}

export type { SectionType }
export { Section, SectionContent, SectionLegend }
