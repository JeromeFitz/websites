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

import {
  RadixBackgrounds,
  RadixBorders,
  RadixColors,
  TailwindWidth,
} from '~components/Playground'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

const isDev = process.env.NODE_ENV === 'development'
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
const siteColors = [
  'black',
  // 'gray',
  'orange',
  'pink',
  'purple',
  'slate',
  'white',
  // '',
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
                  'border-[1px]',
                  '',
                  '',
                  '',
                  ''
                )
                return (
                  <li key={`radix-borders-${id}-${borderType}`} className={styles}>
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
                key={`radix-buttons-${radixColor}-${buttonType}`}
                className={'mb-4'}
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
              key={`notion-colors-${notionColor}`}
              className={`notion-${notionColor} py-2 pl-1`}
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
              const color = cx(
                `text-radix-${radixColor}${i}`,
                `py-0.5 pl-2`,
                '',
                '',
                '',
                '',
                ''
              )
              return (
                <li key={`radix-colors-${id}`} className={color}>
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
                ''
              )
              return (
                <li key={`radix-bg-colors-${id}`} className={color}>
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
      <div className="bg-radix-green6 grid grid-flow-col auto-rows-max grid-cols-12 gap-x-4 gap-y-2">
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-1">01</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-2">02</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-3">03</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-4">04</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-5">05</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-6">06</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-7">07</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-8">08</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-9">09</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-10">10</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-11">11</div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-12">12</div>
      </div>
      <div className="bg-radix-green6 grid grid-flow-col auto-rows-max grid-cols-12 gap-x-4 gap-y-2">
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-1 col-start-1">
          01
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-2 col-start-1">
          02
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-3 col-start-1">
          03
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-4 col-start-1">
          04
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-5 col-start-1">
          05
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-6 col-start-1">
          06
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-7 col-start-1">
          07
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-8 col-start-1">
          08
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-9 col-start-1">
          09
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-10 col-start-1">
          10
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-11 col-start-1">
          11
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-12 col-start-1">
          12
        </div>
        <div className="odd:bg-radix-yellow6 bg-radix-pink6 col-span-full">Full</div>
      </div>
    </>
  )
}

const SECTIONS = [
  { ID: 'radix-borders', COMPONENT: TailwindHackForDynamicallyLoadedStylesBorders },
  { ID: 'radix-buttons', COMPONENT: TailwindHackForDynamicallyLoadedStylesButtons },
  { ID: 'radix-colors', COMPONENT: TailwindHackForDynamicallyLoadedStylesColors },
  { ID: 'radix-columns', COMPONENT: TailwindHackForDynamicallyLoadedStylesColSpans },
  { ID: 'tailwind-width', COMPONENT: TailwindWidth },
]

export default function Page() {
  return (
    <>
      {SECTIONS.map((SECTION) => {
        const { ID, COMPONENT } = SECTION
        return (
          <SectionWrapper>
            <SectionHeader>
              <SectionHeaderTitle isTitle>{ID}</SectionHeaderTitle>
            </SectionHeader>
            <SectionContent>
              <COMPONENT />
            </SectionContent>
          </SectionWrapper>
        )
      })}
      <Testing />
    </>
  )
}
