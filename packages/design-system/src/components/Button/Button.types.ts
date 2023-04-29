type Classname = string | undefined

type Variant =
  | 'default'
  | 'empty'
  | 'ghost'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'text'

type Variants = {
  [key in Uppercase<Variant>]: Variant
}

export type { Classname, Variant, Variants }
