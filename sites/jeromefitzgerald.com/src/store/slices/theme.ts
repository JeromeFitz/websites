import { GetState, SetState } from 'zustand'

type IThemeType = 'light' | 'dark'

interface ITheme {
  theme: IThemeType
  themeSet: (theme: IThemeType) => void
}

const initState: Omit<ITheme, 'themeSet'> = {
  theme: 'light',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Theme = (set: SetState<ITheme>, get: GetState<ITheme>) => {
  const { theme } = initState

  return {
    theme,
    themeSet: (theme: IThemeType) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      set((prev) => ({ theme }))
    },
  }
}

export type { ITheme }
export default Theme
