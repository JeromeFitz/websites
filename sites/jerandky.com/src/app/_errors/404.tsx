import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'

// @todo(types)
function FourOhFour({
  isNotPublished = false,
  segmentInfo = {},
}: {
  isNotPublished: boolean
  segmentInfo: any
}) {
  const title = '404'
  const message = `Page Not Found${isNotPublished ? ':' : '.'}`
  const body = `Hey, sometimes these things happen. I bet if this page existed it would be pretty cool.`

  return (
    <>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <>
            <h1 className="mb-7 text-6xl font-black">{message}</h1>
            <p className="text-lg">{body}</p>
            <Separator my="4" orientation="horizontal" size="4" />
            <p className="text-lg">
              Please try and go back to the{` `}
              <Anchor href="/">homepage</Anchor>.
            </p>
            {!isObjectEmpty(segmentInfo) && (
              <>
                <Separator my="4" orientation="horizontal" size="4" />
                <h2 className="text-xl font-bold">Error Information:</h2>
                <ul className="my-4 list-inside list-disc">
                  <li>
                    <strong>url: </strong>
                    <span>{segmentInfo?.slug}</span>
                  </li>
                </ul>
              </>
            )}
          </>
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export { FourOhFour }
