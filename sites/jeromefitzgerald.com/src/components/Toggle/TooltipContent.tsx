import {
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'

const TC = ({ content }) => {
  return (
    <>
      <TooltipContent align="end" sideOffset={5}>
        {content}
        <TooltipArrow offset={15} />
      </TooltipContent>
    </>
  )
}

export default TC
