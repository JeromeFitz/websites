import { useEffect, useRef, useState } from 'react'

function useSticky() {
  const ref = useRef<HTMLDivElement>(null)

  /**
   * @note Ideally this would be default false...
   * but need to flip this for some reason
   * figure it out later but hack it in return
   */
  const [isNotSticky, setIsNotSticky] = useState(true)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([event]) => setIsNotSticky(event.intersectionRatio < 1),
      { rootMargin: '-1px 0px 0px 0px', threshold: [1] },
    )
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return { isNotSticky, isSticky: !isNotSticky, ref }
}

export { useSticky }
