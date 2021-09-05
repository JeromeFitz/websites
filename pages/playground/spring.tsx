/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
// import useResizeAware from 'react-resize-aware'
import { animated, config, useSpring, to, Globals, useTrail, a } from 'react-spring'

import Layout from '~components/Layout'
import usePrefersReducedMotion from '~hooks/usePrefersReducedMotion'
import { WEBKIT_BACKGROUND } from '~lib/constants'

import styles from './spring.module.css'

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    // config: { mass: 5, tension: 2000, friction: 200 },
    config: config.slow,
    delay: 0,
    opacity: open ? 1 : 0,
    x: open ? 0 : -200,
    // height: open ? 125 : 0,
    // from: { opacity: 0, x: 20, height: 0 },
    from: { opacity: 0, x: -200 },
  })
  return (
    <div className="flex flex-row overflow-x-hidden">
      {trail.map(({ ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <span style={WEBKIT_BACKGROUND}>{items[index]}</span>
        </a.div>
      ))}
    </div>
  )
}

const Spring = () => {
  // @ts-ignore
  const [open, set] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()
  useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    })
  }, [prefersReducedMotion])

  // @ts-ignore
  const [flip, flipSet] = useState(false)
  // @ts-ignore
  const props = useSpring({
    delay: 200,
    from: { opacity: 0 },
    reset: false,
    reverse: flip,
    to: { opacity: 1 },
    // config: config.molasses,
    // onRest: () => flipSet(!flip),
  })
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 1,
    delay: 200,
    // config: config.molasses,
    // onRest: () => flipSet(!flip),
  })
  const props2 = useSpring({
    from: {
      background: 'linear-gradient(to right, #009fff, #ec2f4b)',
      borderBottom: '0px solid #2D3747',
      boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.4)',
      display: 'block',
      opacity: 1,
      padding: 0,
      shape: 'M20,20 L20,380 L380,380 L380,20 L20,20 Z',
      textShadow: '0px 0px 0px rgba(255,255,255,0.0)',
      transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)',
      vector: [0, 0, 0],
    },
    to: {
      background: 'linear-gradient(to right, #009fff, #ec2f4b)',
      borderBottom: '10px solid #2D3747',
      boxShadow: '0px 10px 20px 0px rgba(0,0,0,1)',
      display: 'block',
      opacity: 1,
      padding: 20,
      shape: 'M20,20 L20,380 L380,380 L380,20 L20,20 Z',
      textShadow: '0px 5px 15px rgba(255,255,255,1)',
      transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)',
      vector: [0, 10, 30],
    },
  })
  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0, 0, 0], color: 'transparent' },
    o: 1,
    xyz: [10, 20, 5],
    color: 'black',
  })
  // const [resizeListener, sizes] = useResizeAware()
  // const resizes = useSpring({ width: 100, height: 100 })
  // console.dir(`sizes`)
  // console.dir(sizes)
  const props3 = useSpring({ x: flip ? 0 : 1 })
  // const [style, api] = useSpring({ opacity: 0, x: -100, y: 0 }, [])
  const [style, api] = useSpring(() => ({ opacity: 0, x: -100, y: 0 }))
  useEffect(() => {
    api.start({ opacity: 1, x: 0, y: 0 })
  }, [api])

  return (
    <Layout>
      <Trail open={open}>
        <span>Jerome</span>
      </Trail>
      <animated.h1 className="text-black" style={style}>
        Lorem ipsum
      </animated.h1>
      <animated.h1 className="text-black" style={props2}>
        Dolor esto.
      </animated.h1>
      <animated.h2>{number.to((n) => n.toFixed(2))}</animated.h2>
      <animated.div
        style={{
          // If you can, use plain animated values like always, ...
          // You would do that in all cases where values "just fit"
          color,
          // Unless you need to interpolate them
          background: o.to((o) => `rgba(210, 57, 77, ${o})`),
          // Which works with arrays as well
          transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
          // If you want to combine multiple values use the "interpolate" helper
          border: to([o, color], (o: any, c) => `${10 * o}px solid ${c}`),
          // You can also form ranges, even chain multiple interpolations
          padding: o
            .to({ range: [0, 0.5, 1], output: [0, 0, 10] })
            .to((o) => `${o}%`),
          // Interpolating strings (like up-front) through ranges is allowed ...
          borderColor: o.to({ range: [0, 1], output: ['red', '#ffaabb'] }),
          // There's also a shortcut for plain, optionless ranges ...
          opacity: o.to([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
        }}
      >
        {o.to((n) => n.toFixed(2)) /* innerText interpolation ... */}
      </animated.div>
      {/* <animated.div
        className="bg-green-500"
        style={{ overflow: 'hidden', ...resizes }}
      >
        {resizeListener}
        <div>
          Your content here. (div sizes are {sizes.width} x {sizes.height})
        </div>
      </animated.div> */}
      <animated.div
        style={{
          transform: props3.x
            .to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            })
            .to((x) => `scale(${x})`),
        }}
      >
        fox
      </animated.div>
    </Layout>
  )
}

export default Spring
