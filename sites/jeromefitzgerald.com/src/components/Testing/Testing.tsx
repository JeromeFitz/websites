import { Anchor } from '@jeromefitz/ds/components/Anchor'

import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'
// import { ThemeToggle } from '~app/ThemeToggle'

const isDev = process.env.NODE_ENV === 'development'

const links = [
  '/',
  '/events/2023/06/16/jerome-and',
  '/events/2023/06/16',
  '/events/2023/06',
  '/events/2023',
  '/events',
  '/people/jerome-fitzgerald',
  '/people',
  '/shows/jerome-and',
  '/shows',
  //
  '/design-system',
  // '/kitchen-sink',
]

function Wrapper({ children }) {
  if (!isDev) return null
  if (isDev) return null
  return (
    <>
      {/* Testing */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Testing</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>{children}</SectionContent>
      </SectionWrapper>
    </>
  )
}

function Testing() {
  return (
    <Wrapper>
      <ul>
        {links.map((href, i) => {
          return (
            <li key={`homepage-link-${i}`} className="my-1 py-1">
              <Anchor href={href} className="text-base md:text-xl">
                {href}
              </Anchor>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

export { Testing }
