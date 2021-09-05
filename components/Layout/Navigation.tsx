import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import cx from 'clsx'
import _map from 'lodash/map'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { memo, useState, useEffect } from 'react'
import { animated } from 'react-spring'
import _title from 'title'
import useSound from 'use-sound'

import Emoji from '~components/Notion/Emoji'
import SplitText from '~components/SplitText'
import links from '~config/notion/website/jeromefitzgerald.com/navigation'
import { useUI } from '~context/ManagedUIContext'
import useBoop from '~hooks/useBoop'

const config = {
  emoji: {
    true: '🔉️',
    false: '🔇️',
  },
  theme: {
    dark: '🌚️',
    light: '🌞️',
  },
  // spring: {
  //   base: {
  //     x: 0,
  //     y: 0,
  //     rotation: 0,
  //     scale: 1,
  //     timing: 150,
  //     springConfig: {
  //       tension: 300,
  //       friction: 10,
  //     },
  //   },
  //   scale: {
  //     x: 0,
  //     y: 0,
  //     rotation: 0,
  //     scale: 1.2,
  //     timing: 150,
  //     springConfig: {
  //       tension: 300,
  //       friction: 10,
  //     },
  //   },
  // },
}

const Navigation = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { audio, toggleAudio } = useUI()
  const [styleAudio, triggerAudio] = useBoop({ scale: 1.2 })
  const [styleTheme, triggerTheme] = useBoop({ scale: 1.2 })

  const [playBleep] = useSound('/static/audio/bleep.mp3', { soundEnabled: audio })
  const [playEnableSound] = useSound('/static/audio/enable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })
  const [playDisableSound] = useSound('/static/audio/disable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <SkipNavLink />
      <nav className="bg-blur bg-opacity-50 dark:bg-opacity-50 z-40 top-0 sticky min-w-full">
        <svg className="svg-blur" style={{ display: 'none' }}>
          <filter id="sharpBlur">
            <feGaussianBlur stdDeviation="36"></feGaussianBlur>
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
            ></feColorMatrix>
            <feComposite in2="SourceGraphic" operator="in"></feComposite>
          </filter>
        </svg>
        <div
          className={cx(
            'flex flex-row justify-between items-center',
            // 'w-full p-8 my-0 md:my-8 mx-auto max-w-4xl'
            'w-full max-w-4xl',
            'mx-auto',
            'my-0 md:my-8',
            'p-4 md:p-6'
          )}
        >
          <div>
            {mounted &&
              _map(links, (link) => {
                if (!link.active) {
                  return true
                }
                // @refactor(isSelected) This is ... a mess haha
                const isSelected =
                  (router.asPath.length > 1 &&
                    router.asPath.startsWith(link.href) &&
                    link.title !== 'home') ||
                  (router.asPath.length === 1 && link.title === 'home')

                const linkTitle = _title(link.title)
                const linkTitleMobile = _title(link.titleMobile)

                return (
                  <NextLink href={link.href} key={`nav-link-${link.title}`}>
                    <a
                      className={cx(
                        'p-1 md:p-4 md:pl-0',
                        'font-semibold text-sm md:text-lg',
                        !isSelected &&
                          'hover:text-green-500 dark:hover:text-yellow-200',
                        isSelected &&
                          'underline underline-thickness-sm underline-offset-lg font-bold'
                      )}
                      aria-label={linkTitle}
                    >
                      <span className="md:hidden">{linkTitleMobile}</span>
                      <span className="hidden md:inline-flex flex-row flex-wrap">
                        <SplitText splitBy="letter" text={linkTitle} />
                      </span>
                    </a>
                  </NextLink>
                )
              })}
          </div>
          <div>
            <animated.button
              aria-label={`${theme === 'light' ? 'Enable' : 'Disable'} sounds`}
              className="text-2xl mr-2.5"
              onClick={() => {
                triggerAudio
                audio ? playDisableSound() : playEnableSound()
                toggleAudio()
              }}
              onMouseEnter={() => triggerAudio}
              style={styleAudio}
            >
              <Emoji character={config.emoji[audio]} />
            </animated.button>

            <animated.button
              aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="text-2xl"
              onClick={() => {
                triggerTheme
                playBleep()
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
              onMouseEnter={() => triggerTheme}
              style={styleTheme}
            >
              <Emoji character={config.theme[theme || 'dark']} />
            </animated.button>
          </div>
        </div>
      </nav>
      <SkipNavContent />
    </>
  )
}

export default memo(Navigation)
