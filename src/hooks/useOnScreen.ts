import { useState, useEffect } from 'react'

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return null

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isIntersecting
}

export default useOnScreen
