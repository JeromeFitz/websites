import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ExternalLinkIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
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
      <Box
        className={cx(
          'flex w-full flex-col md:flex-row',
          'gap-[var(--sidebar-gap)]',
          'mb-24',
        )}
      >
        <Box
          className={cx(
            // 'bg-purple-6 rounded-3 border-1',
            'col-span-3',
            'hidden md:block',
            '!md:w-[var(--sidebar-width)] w-full md:max-w-[var(--sidebar-width)] md:min-w-[var(--sidebar-width)]',
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
                'after:border-accent-9 after:pointer-events-none after:absolute after:top-0 after:left-0 after:size-full after:border-t-1 after:content-[""]',
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
                    'flex shrink-0 transform-none flex-col items-center justify-center outline-hidden',
                    'relative line-clamp-1 h-full w-[1px] flex-[1_0_0px]',
                  )}
                >
                  <Heading as="h3" className={cx('text-white dark:text-black')}>
                    {item.icon ? (
                      <Icon className="!size-6" />
                    ) : (
                      <Code variant="ghost">{i + 1}</Code>
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
                    'flex shrink-0 transform-none flex-col items-start justify-start outline-hidden',
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
                {item.content ? item.content : <Lorem />}
              </Box>
            </Box>
          </section>
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
          <NextLink
            className={cx(
              'hocus:bg-accent-4 group relative flex size-full flex-row flex-nowrap items-center justify-start gap-4 overflow-visible p-5 no-underline',
              'border-gray-7 border-t-1 first-of-type:border-t-0',
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
                      {item.icon ? (
                        <Icon className="!size-4" />
                      ) : (
                        <Code variant="ghost">{i + 1}</Code>
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

export type { SectionType }
export { Section, SectionContent, SectionLegend }
