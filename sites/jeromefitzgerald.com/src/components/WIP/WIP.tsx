import { FileTextIcon } from '@jeromefitz/ds/components/Icon/index'

function Wrapper({ children }) {
  return (
    <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom lg:py-0">
      <span className="mr-2 mt-1 size-4">
        <FileTextIcon className="text-inherit" />
      </span>
      <span>
        <span className="font-bold">Please Note: </span>
        {children}
      </span>
    </div>
  )
}

function WIPFooter() {
  return (
    <Wrapper>
      <span>
        This site is being actively developed. So though it is nowhere near perfect,
        it is shippable, heh.{` `}
        <br className="hidden lg:inline" />
        Consider this eternally under construction I guess
      </span>
    </Wrapper>
  )
}

function WIP({
  description = 'This page is in the process of being updated.',
}: {
  description?: string
}) {
  return (
    <Wrapper>
      <span>{description}</span>
    </Wrapper>
  )
}

export { WIP, WIPFooter }
