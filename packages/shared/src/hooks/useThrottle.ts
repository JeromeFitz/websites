import _throttle from 'lodash/throttle'
import { useCallback, useEffect, useRef } from 'react'

function useThrottle(cb, delay) {
  const options = { leading: true, trailing: false }
  const cbRef = useRef(cb)
  useEffect(() => {
    cbRef.current = cb
  })
  // biome-ignore lint/correctness/useExhaustiveDependencies: migrate
  return useCallback(
    _throttle((...args) => cbRef.current(...args), delay, options),
    [delay],
  )
}

export { useThrottle }
