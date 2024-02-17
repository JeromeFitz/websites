import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'

import { Modal } from './_components/Newsletter.Modal'

export default function Page() {
  const title = 'Newsletter'

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
      </SectionHeader>
      <SectionContent>
        <Modal />
      </SectionContent>
    </SectionWrapper>
  )
}
