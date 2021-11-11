declare module '*.png' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}

type Format = 'png' | 'jpeg'
type Theme = 'light' | 'dark'

interface Image {
  src: string
  width: string
  height: string
}
