import {
  Tooltip as ReachTooltip,
  TooltipProps as ReachTooltipProps,
} from '@reach/tooltip'
import { VisuallyHidden } from '@reach/visually-hidden'
import cx from 'clsx'
import * as React from 'react'

const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'> & TooltipOwnProps
>(function Tooltip(props, forwardedRef) {
  const trickTheComputer = useGoofyCssTrick()

  console.dir(`Tooltip`)
  console.dir(props)

  return (
    <React.Fragment>
      <ReachTooltip
        ref={forwardedRef}
        as="div"
        className={cx(props.className)}
        {...props}
      />
      {trickTheComputer && <FakerTooltip {...props} />}
    </React.Fragment>
  )
})

type TooltipOwnProps = ReachTooltipProps

export type { TooltipOwnProps as TooltipProps }
export default Tooltip

// Ok so for future me, here's what's happening. Tooltip rendering is delayed
// until the user interacts with its trigger. I haven't investigated too deeply,
// but I think the css module loading is also delayed, meaning the very first
// time a user tries to interact with a tooltip there is a flash on unstyled
// content and the tooltip looks all janky. I don't want to server render any
// bogus trickery so I do a couple of useEffects when Tooltip is rendered the
// very first time to quickly render a visually hidden div that loads the styles
// so that when the tooltip shows up it's very pretty as the styles dictate it
// should be. I'm sure someone has solved this better somewhere but I'm too lazy
// to look.
let rendered = false
function useGoofyCssTrick() {
  const [trick, setTrick] = React.useState(false)

  React.useEffect(() => {
    if (!rendered) {
      rendered = true
      setTrick(true)
    }
  }, [])

  React.useEffect(() => {
    if (trick) {
      setTrick(false)
    }
  }, [trick])

  return trick
}

function FakerTooltip(props: any) {
  console.dir(`FakerTooltip`)
  console.dir(props)
  return (
    <VisuallyHidden>
      <div className={cx(props.className)}>{props.label}</div>
    </VisuallyHidden>
  )
}
