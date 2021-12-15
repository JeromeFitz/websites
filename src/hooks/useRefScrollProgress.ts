/*
  Takes an optional component ref (or returns a new one)
  and returns the ref, the scroll `start` and `end` percentages
  that are relative to the total document progress.
*/
// ref: https://cole.codes/posts/framer-motion-useviewportscroll-element-scroll
import { useLayoutEffect, useRef, useState } from 'react'

function useRefScrollProgress(inputRef) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = inputRef || useRef()
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const offsetTop = rect.top + scrollTop
    setStart(offsetTop / document.body.clientHeight)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    setEnd((offsetTop + rect.height) / document.body.clientHeight)
  }, [ref])
  return { ref, start, end }
}

export default useRefScrollProgress
