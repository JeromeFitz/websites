import { FileTextIcon } from '@jeromefitz/ds/components/Icon'

function Wrapper({ children }) {
  return (
    <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom md:py-0">
      <span className="mr-2 mt-1 h-4 w-4">
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
        <br className="hidden md:inline" />
        Consider this eternally under construction I guess
      </span>
    </Wrapper>
  )
}

function WIP() {
  return (
    <Wrapper>
      <span>This page is in the process of being updated.</span>
    </Wrapper>
  )
}

export { WIP, WIPFooter }
