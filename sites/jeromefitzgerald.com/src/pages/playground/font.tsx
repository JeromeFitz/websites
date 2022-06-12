import { PageHeading, Separator, Text } from '@jeromefitz/design-system'
import * as React from 'react'

const properties = {
  title: 'Variable Font 123 GOO ars',
  seoDescription: 'Attempt to figure out why only some glyphs show.',
}

// "case" 0,
// "cpsp" 0,
// "dlig" 0,
// "frac" 0,
// "dnom" 0,
// "numr" 0,
// "salt" 0,
// "subs" 0,
// "sups" 0,
// "tnum" 0,
// "zero" 0,
// "ss01" 0,
// "ss02" 0,
// "ss03" 0,
// "ss04" 0,
// "cv01" 0,
// "cv02" 0,
// "cv03" 0,
// "cv04" 0,
// "cv05" 0,
// "cv06" 0,
// "cv07" 0,
// "cv08" 0,
// "cv09" 0,
// "cv10" 0,
// "cv11" 0,
// "calt" 0,
// "ccmp" 0,
// "kern" 1
// https://rsms.me/inter/lab/?feat-cv01=1&feat-ss01=1&feat-ss02=1&feat-ss03=1&invert-colors=1&wght=900
// const css_ff = {
//   fontFeatureSettings: `
//     "calt",
//     "zero",
//     "ss01",
//     "ss02",
//     "ss03",
//     "cv01",
//     "cv05",
//     "cv08",
//     "cv10"
//   `,
//   fontVariantNumeric: 'unset',
//   fontVariationSettings: "'wght' 900",
// }
// const css_ff2 = {
//   fontFeatureSettings: '"calt","zero","ss03","cv01","cv05","cv08","cv09","cv10"',
//   fontVariantNumeric: 'unset',
//   fontVariationSettings: "'wght' 900",
//   letterSpacing: '-0.045em;',
// }
const css_ff2 = {}

const css = css_ff2

const text = '0123456789 GOODIE-MOB arsénal => -> -> → ARSENAL'

const PagesFont = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator my="3" size="full" />
      <Text
        size="8"
        css={{
          ...css,
        }}
      >
        {text}
      </Text>
      <Text
        size="8"
        css={{
          ...css,
          fontFeatureSettings: '"calt", "salt", "cv10"',
        }}
      >
        {text}
      </Text>
      <Text size="9">{text}</Text>
    </>
  )
}

export default PagesFont
