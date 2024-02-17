import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { isObjectEmpty } from '@jeromefitz/utils'

import { ModuleRow } from '~app/_temp/modules/ModuleRow'
import { TopBar } from '~app/_temp/modules/TopBar'
import { LayoutClient } from '~app/layout.client'

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
      <LayoutClient>
        <div className="w-full min-w-full">
          <TopBar
            className=""
            description={title}
            isHidden={false}
            isHiddenTags={true}
            isHiddenTitle={false}
            label={message}
            tags={[]}
            title={message}
          />
          <ModuleRow>
            <p className="text-lg">{body}</p>
            <Separator className="my-8" />
            <p className="text-lg">
              Please try and go back to the{` `}
              <Anchor href="/">homepage</Anchor>.
            </p>
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
          </ModuleRow>
        </div>
      </LayoutClient>
    </>
  )
}

export { FourOhFour }
