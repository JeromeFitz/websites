import {
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { useRouter } from 'next/router'

const TC = () => {
  const router = useRouter()
  const isHompage = router.asPath === '/'
  return (
    <>
      {!isHompage && (
        <TooltipContent align="start" sideOffset={5}>
          {`Go back to homepage`}
          <TooltipArrow offset={15} />
        </TooltipContent>
      )}
    </>
  )
}

export default TC
