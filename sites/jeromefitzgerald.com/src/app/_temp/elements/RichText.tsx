import { cx } from '@jeromefitz/ds/utils/cx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Label, Text } from './index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RichText({ className = '', label, text }) {
  return (
    <>
      <div
        className={cx(
          '[&>:not(:first-child)]:mt-4',
          // '', '', '', '', '',
          className,
        )}
      >
        {/* <Label>{label}</Label> */}
        <Text>{text}</Text>
      </div>
    </>
  )
}

export { RichText }
