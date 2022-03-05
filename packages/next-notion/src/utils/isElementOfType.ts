/**
 * Returns true if the element is of type P, returns false otherwise
 * @param {any} element
 * @param {React.ComponentType<P>} ComponentType
 * @returns {boolean}
 */
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
function isElementOfType<P = {}>(
  element: unknown,
  ComponentType: React.ComponentType<P>
): element is React.ReactElement<P> {
  const reactElement = element as React.ReactElement

  return (
    reactElement &&
    reactElement.type &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reactElement.type.displayName &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reactElement.type.displayName === ComponentType.displayName
  )
}

export { isElementOfType }
