import { Separator } from '@jeromefitz/ds/components/Separator'
import { isObjectEmpty } from '@jeromefitz/utils'

import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'

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
            {!isObjectEmpty(segmentInfo) && (
              <>
                <Separator className="my-8" />
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
