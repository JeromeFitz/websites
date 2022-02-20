/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetState, SetState } from 'zustand'

import { ThemeState } from '../useTheme'

type IThemeType = 'light' | 'dark'

interface ITheme {
  theme: IThemeType
  themeSet: (theme: IThemeType) => void
}

const initState: Omit<ITheme, 'themeSet'> = {
  theme: 'light',
}

const Theme = (set: SetState<ThemeState>, get: GetState<ThemeState>) => {
  const { theme } = initState

  return {
    theme,
    themeSet: (theme: IThemeType) => {
      set((prev) => ({ theme }))
    },
  }
}

export type { ITheme }
export default Theme
