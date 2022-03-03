import * as React from 'react'

const NoSSR = ({ children, onSSR = <React.Fragment /> }) => {
  const [canRender, setCanRender] = React.useState(false)
  React.useEffect(() => {
    if (!canRender) {
      setCanRender(true)
    }
  }, [canRender])
  return canRender ? children : onSSR
}

// const NoSSR = ({ children, onSSR = <React.Fragment /> }) =>
//   `undefined` !== typeof window ? children : onSSR

export default NoSSR
