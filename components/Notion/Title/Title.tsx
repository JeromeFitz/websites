/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { config, useTrail, a } from 'react-spring'

import Avatar from '~components/Avatar'
// import Emoji from '~components/Notion/Emoji'
import { WEBKIT_BACKGROUND } from '~lib/constants'
import styles from '~pages/playground/spring.module.css'

const Trail: React.FC = ({ children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: config.slow,
    delay: 0,
    opacity: 1,
    x: 0,
    // from: { opacity: 0, x: 0 },
    from: { opacity: 0, x: -200 },
  })

  return (
    <>
      {trail.map(({ ...style }, index) => {
        return (
          <a.span key={index} className={styles.trailsText} style={style}>
            {items[index]}
          </a.span>
        )
      })}
    </>
  )
}

const Title = ({ emoji, id, title }) => {
  return (
    <h1
      className="flex flex-row overflow-x-hidden items-center"
      key={id}
      style={WEBKIT_BACKGROUND}
    >
      <span className="z-10 bg-white dark:bg-black">
        {/* {emoji && <Emoji character={emoji} margin={true} />} */}
        {/* {!emoji && <Avatar name={title} />} */}
        <Avatar name={title} />
      </span>
      <Trail>{title}</Trail>
    </h1>
  )
}

export default Title
