'use client'
/**
 * @hack @note Page that is built at runtime with all Tailwind CSS required for dynamic dev
 *
 * This goes through dynamic creation of the the HTML Elements necessary, and then
 *  hidden elements that _actually_ are the reason colors render throughout on DEV environment
 *  when you are coding. (2 step process when adding new functions)
 *
 */
import { Button } from '@jeromefitz/ds/components/Button'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Grid } from '@/app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/app/playground/2024/_components/Headline'
// import dynamic from 'next/dynamic'

import {
  RadixBackgrounds,
  RadixBorders,
  RadixColors,
  TailwindWidth,
} from '@/components/Playground/index'
// const RadixBackgrounds = dynamic(async () => {
//   const { RadixBackgrounds: Component } = await import('~components/Playground')
//   return { default: Component }
// })
// const RadixBorders = dynamic(async () => {
//   const { RadixBorders: Component } = await import('~components/Playground')
//   return { default: Component }
// })
// const RadixColors = dynamic(async () => {
//   const { RadixColors: Component } = await import('~components/Playground')
//   return { default: Component }
// })
// const TailwindWidth = dynamic(async () => {
//   const { TailwindWidth: Component } = await import('~components/Playground')
//   return { default: Component }
// })
import { Testing } from '@/components/Testing/index'

const isDev = process.env.NODE_ENV === 'development'
const siteColors = [
  'black',
  // 'gray',
  // 'orange',
  'pink',
  // 'purple',
  'slate',
  'white',
  // '',
]
const foregroundTextBlack = ['sky', 'mint', 'lime', 'yellow', 'amber']

const notionColors = [
  // 'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'gray_background',
  'brown_background',
  'orange_background',
  'yellow_background',
  'green_background',
  'blue_background',
  'purple_background',
  'pink_background',
  'red_background',
]
const _radixColors = [
  'tomato',
  'red',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'grass',
  'orange',
  'brown',
  // bright
  'sky',
  'mint',
  'lime',
  'yellow',
  'amber',
  // grays
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
  // metals
  'gold',
  'bronze',
  // overlays
  'black',
  'white',
]

const radixColors = isDev ? siteColors : _radixColors

const borderTypes = ['', '-x', '-y', '-s', '-e', '-t', '-r', '-b', '-l']
const buttonTypes = ['', '-cta', '-outline', '-solid', '-transparent']

function TailwindHackForDynamicallyLoadedStylesBorders() {
  return (
    <>
      <h3 className="my-4 py-4 text-3xl font-bold">Radix Borders</h3>
      <ul>
        {radixColors.map((radixColor) => {
          if (radixColor.includes('black') || radixColor.includes('white')) {
            return null
          }
          return borderTypes.map((borderType) => {
            return Array(12)
              .fill(0)
              .map((_, _i) => {
                const i = _i + 1
                const id = `${radixColor}-${i}`
                // eslint-disable-next-line tailwindcss/no-contradicting-classname
                const styles = cx(
                  `border${borderType}-radix-${radixColor}${i}`,
                  `my-0.5 py-0.5 pl-2`,
                  'border-1',
                  '',
                  '',
                  '',
                  '',
                )
                return (
                  <li className={styles} key={`radix-borders-${id}-${borderType}`}>
                    {styles}
                  </li>
                )
              })
          })
        })}
      </ul>
      <RadixBorders />
    </>
  )
}

function TailwindHackForDynamicallyLoadedStylesButtons() {
  return (
    <>
      <h3 className="my-4 py-4 text-3xl font-bold">Radix Buttons</h3>
      <ul>
        {radixColors.map((radixColor) => {
          if (radixColor.includes('black') || radixColor.includes('white')) {
            return null
          }
          return buttonTypes.map((buttonType) => {
            return (
              <li
                className={'mb-4'}
                key={`radix-buttons-${radixColor}-${buttonType}`}
              >
                <Button className={`${radixColor}-button${buttonType}`}>
                  {radixColor}-button
                  {buttonType}
                </Button>
              </li>
            )
          })
        })}
      </ul>
      {/* <RadixButtons /> */}
    </>
  )
}

function TailwindHackForDynamicallyLoadedStylesColors() {
  return (
    <>
      <h3 className="my-4 py-4 text-3xl font-bold">Notion Colors</h3>
      <ul>
        {notionColors.map((notionColor) => {
          if (notionColor.includes('white')) {
            return null
          }
          return (
            <li
              className={`notion-${notionColor} py-2 pl-1`}
              key={`notion-colors-${notionColor}`}
            >
              {notionColor}
            </li>
          )
        })}
      </ul>
      <h3 className="my-4 py-4 text-3xl font-bold">Radix Colors</h3>
      <ul>
        {radixColors.map((radixColor) => {
          if (radixColor.includes('black') || radixColor.includes('white')) {
            return null
          }

          return Array(12)
            .fill(0)
            .map((_, _i) => {
              const i = _i + 1
              const id = `${radixColor}-${i}`
              // eslint-disable-next-line tailwindcss/no-custom-classname
              const color = cx(
                `text-radix-${radixColor}${i}`,
                `py-0.5 pl-2`,
                '',
                '',
                '',
                '',
                '',
              )
              return (
                <li className={color} key={`radix-colors-${id}`}>
                  {color}
                </li>
              )
            })
        })}
      </ul>
      <RadixColors />
      <h3 className="my-4 py-4 text-3xl font-bold">Radix Backgrounds</h3>
      <ul>
        {radixColors.map((radixColor) => {
          if (radixColor.includes('black') || radixColor.includes('white')) {
            return null
          }

          return Array(12)
            .fill(0)
            .map((_, _i) => {
              const i = _i + 1
              const id = `${radixColor}-${i}`
              // eslint-disable-next-line tailwindcss/no-custom-classname
              const color = cx(
                `bg-radix-${radixColor}${i}`,
                i >= 9 &&
                  i < 12 &&
                  foregroundTextBlack.includes(radixColor) &&
                  `text-black`,
                i >= 12 && `text-white dark:text-black`,
                `py-2 pl-2`,
                '',
                '',
                '',
                '',
                '',
                '',
              )
              return (
                <li className={color} key={`radix-bg-colors-${id}`}>
                  {color}
                </li>
              )
            })
        })}
      </ul>
      <RadixBackgrounds />
    </>
  )
}

function TailwindHackForDynamicallyLoadedStylesColSpans() {
  return (
    <>
      <h3 className="my-4 py-4 text-3xl font-bold">Grid</h3>
      <div className="grid grid-flow-col auto-rows-max grid-cols-12 gap-x-4 gap-y-2 bg-[var(--slate-6)]">
        <div className="col-span-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          01
        </div>
        <div className="col-span-2 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          02
        </div>
        <div className="col-span-3 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          03
        </div>
        <div className="col-span-4 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          04
        </div>
        <div className="col-span-5 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          05
        </div>
        <div className="col-span-6 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          06
        </div>
        <div className="col-span-7 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          07
        </div>
        <div className="col-span-8 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          08
        </div>
        <div className="col-span-9 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          09
        </div>
        <div className="col-span-10 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          10
        </div>
        <div className="col-span-11 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          11
        </div>
        <div className="col-span-12 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          12
        </div>
      </div>
      <div className="grid grid-flow-col auto-rows-max grid-cols-12 gap-x-4 gap-y-2 bg-[var(--slate-6)]">
        <div className="col-span-1 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          01
        </div>
        <div className="col-span-2 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          02
        </div>
        <div className="col-span-3 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          03
        </div>
        <div className="col-span-4 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          04
        </div>
        <div className="col-span-5 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          05
        </div>
        <div className="col-span-6 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          06
        </div>
        <div className="col-span-7 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          07
        </div>
        <div className="col-span-8 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          08
        </div>
        <div className="col-span-9 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          09
        </div>
        <div className="col-span-10 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          10
        </div>
        <div className="col-span-11 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          11
        </div>
        <div className="col-span-12 col-start-1 bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          12
        </div>
        <div className="col-span-full bg-[var(--accent-6)] odd:bg-[var(--slate-6)]">
          Full
        </div>
      </div>
    </>
  )
}

const SECTIONS = [
  { COMPONENT: TailwindHackForDynamicallyLoadedStylesBorders, ID: 'radix-borders' },
  { COMPONENT: TailwindHackForDynamicallyLoadedStylesButtons, ID: 'radix-buttons' },
  { COMPONENT: TailwindHackForDynamicallyLoadedStylesColors, ID: 'radix-colors' },
  { COMPONENT: TailwindHackForDynamicallyLoadedStylesColSpans, ID: 'radix-columns' },
  { COMPONENT: TailwindWidth, ID: 'tailwind-width' },
]

function PlaygroundPage() {
  return (
    <>
      {SECTIONS.map((SECTION) => {
        const { COMPONENT, ID } = SECTION
        return (
          <Grid as="section">
            <HeadlineColumnA>
              <HeadlineTitle aria-label={ID} as="h1">
                <>{ID}</>
              </HeadlineTitle>
              <HeadlineTitleSub>
                <>Testing</>
              </HeadlineTitleSub>
            </HeadlineColumnA>
            <HeadlineContent>
              <COMPONENT />
              <div className="overflow-hidden" />
            </HeadlineContent>
          </Grid>
        )
      })}
      <Testing />
    </>
  )
}

export { PlaygroundPage }
