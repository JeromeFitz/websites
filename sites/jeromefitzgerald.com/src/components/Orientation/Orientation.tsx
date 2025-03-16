'use client'
import { FileTextIcon, UpdateIcon } from '@jeromefitz/ds/components/Icon/index'

import { useOs } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useOrientation } from 'react-use'

const isActive = false

function Orientation({ children }) {
  const os = useOs()
  const { type } = useOrientation()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [os, type])

  // console.dir(`os: ${os}`)
  // console.dir(`type: ${type}`)

  if (loaded && type === 'landscape-primary' && (os === 'ios' || os === 'android'))
    return isActive ? <OrientationContent os={os} /> : <>{children}</>
  return <>{children}</>
}

function OrientationContent({ os }) {
  return (
    <>
      <div className="m-12 flex flex-row items-start justify-start gap-1 py-4 align-text-bottom font-mono md:py-0">
        <span className="mt-1 mr-2 size-4">
          <FileTextIcon className="text-inherit" />
        </span>
        <span>
          <span className="font-bold">Please Note: </span>
          <span>
            This site is being actively developed.
            <br />
            So though it is nowhere near perfect, it is shippable, heh.
          </span>
        </span>
      </div>
      <div className="m-12 flex flex-row items-start justify-start gap-1 py-4 align-text-bottom font-mono md:py-0">
        <span className="mt-1 mr-2 size-4">
          <UpdateIcon className="text-inherit" />
        </span>
        <span>
          <span className="font-bold">But… </span>
          <span>
            it cannot be viewed in landscape mode just yet.
            <br />
            Please turn your <strong>{os}</strong> device.
          </span>
        </span>
      </div>
    </>
  )
}

export { Orientation }
