import hash from 'string-hash'
import color from 'tinycolor2'

import { AvatarProps } from './Avatar.types'

const AvatarFallback = ({ name }: AvatarProps) => {
  const hashed = hash(name)
  const c = color({ h: hashed % 360, s: 0.95, l: 0.5 })
  const c1 = c.toHexString()
  const c2 = c.triad()[1].toHexString()

  const variable = 30
  const variable2 = variable * 2

  return (
    <svg
      role="img"
      aria-label={name}
      width={variable}
      height={variable}
      viewBox={`0 0 ${variable2} ${variable2}`}
      className="rounded-full inline"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={name}>
          <stop stopColor={c1} offset="0%" />
          <stop stopColor={c2} offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none">
        <rect fill={`url(#${name})`} x="0" y="0" width="100%" height="100%" />
      </g>
    </svg>
  )
}

export default AvatarFallback
