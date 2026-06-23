import { throttle as _throttle } from "lodash-es";
import { useCallback, useEffect, useRef } from "react";

function useThrottle(cb: any, delay: any): any {
  const options = { leading: true, trailing: false };
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    _throttle((...args) => cbRef.current(...args), delay, options),
    [delay],
  );
}

export { useThrottle };
