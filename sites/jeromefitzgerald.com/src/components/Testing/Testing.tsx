import { Anchor } from '@jeromefitz/ds/components/Anchor'

import { Grid } from '@/app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/app/playground/2024/_components/Headline'

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

  const title = 'Testing'
  return (
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <>{title}</>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>{children}</HeadlineContent>
      </Grid>
    </>
  )
}

function Testing() {
  return (
    <Wrapper>
      <ul>
        {links.map((href, i) => {
          return (
            <li className="my-1 py-1" key={`homepage-link-${i}`}>
              <Anchor className="text-base lg:text-xl" href={href}>
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
