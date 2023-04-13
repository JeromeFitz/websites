/**
 * @todo(delete) this is fixed in react@next
 * For now leaving in until official offish 18.3.0, or 19.0.0
 */
'use client'
/**
 * @hack(next-themes)
 * reference:
 * - https://github.com/facebook/react/issues/25994#issuecomment-1402287594
 *
 */
import Script from 'next/script'

function ReduxDevTools() {
  /**
   * !!WARNING!!
   * TEMPORARILY WORKAROUND A REACT DEVTOOLS ISSUE https://github.com/facebook/react/issues/25994
   * REMOVE AFTER THE ISSUE IS FIXED
   */
  // Save the original __REACT_DEVTOOLS_GLOBAL_HOOK__.inject
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const reactDevToolsHookInject = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject
  // Override the original __REACT_DEVTOOLS_GLOBAL_HOOK__.inject
  // This will allow us to intercept and modify incoming injectProfilingHooks
  return (
    <>
      <Script id="redux-dev-tools-hack">
        <>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function inject(
              ...args
            ) {
              const newArgs = args.map((arg) => {
                // Only modify the original arguments when injectProfilingHooks is present
                if (!arg || !arg.injectProfilingHooks) return arg

                const {
                  injectProfilingHooks: originalInjectProfilingHooks,
                  ...rest
                } = arg
                return {
                  // Override the original injectProfilingHooks
                  // This will allow us to intercept and modify incoming hooks
                  injectProfilingHooks(...hooks) {
                    const newHooks = hooks.map((hook) => {
                      // Only modify the original hooks when markComponentSuspended is present
                      if (!hook || !hook.markComponentSuspended) return hook

                      // Override the original markComponentSuspended from the hook
                      const {
                        markComponentSuspended: orignalMarkComponentSuspended,
                        ...rest2
                      } = hook
                      return {
                        markComponentSuspended(fiber, wakeable, lanes) {
                          if (typeof wakeable.then === 'function') {
                            return orignalMarkComponentSuspended.call(
                              this,
                              fiber,
                              wakeable,
                              lanes
                            )
                          } else {
                            // If "wakeable.then" is not a function, log a warning.
                            console.warn(
                              'React DevTools issue detected and mitigated!\nSee https://github.com/facebook/react/issues/25994 for more information.',
                              { fiber, wakeable, lanes }
                            )
                          }
                        },
                        ...rest2,
                      }
                    })
                    originalInjectProfilingHooks.apply(this, newHooks)
                  },
                  ...rest,
                }
              })
              return reactDevToolsHookInject.apply(this, newArgs)
            })
          }
        </>
      </Script>
    </>
  )
}

export { ReduxDevTools }
