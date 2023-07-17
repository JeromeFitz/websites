import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'

function Slug({}) {
  const title = 'Jer & Ky BoyZ'
  const subtitle = 'MailShrimp'

  return (
    <>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent className="">{subtitle}</SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <p>Website is under construction.</p>
          <p>
            Everything is available on RSS Feeds though through Apple, Spotify, and
            other podcast providers.
          </p>
          <p>
            <Anchor href="/podcasts/jer-and-ky-and-guest">Jer & Ky (& Guest)</Anchor>
          </p>
          <p>
            <Anchor href="/podcasts/knockoffs">Knockoffs</Anchor>
          </p>
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export default function Page({}) {
  return <Slug />
}
