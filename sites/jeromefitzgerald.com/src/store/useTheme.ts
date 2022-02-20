import create from 'zustand'
import { persist } from 'zustand/middleware'

import createSelectors from './createSelectors'
import type { ITheme } from './slices'
import { ThemeSlice } from './slices'

// @note(types) seems a bit circular when there is only one
type ThemeState = ITheme

const useThemeBase = create<ITheme>(
  persist(
    (set, get) => {
      return {
        ...ThemeSlice(set, get),
      }
    },
    {
      name: 'theme-storage',
      getStorage: () => localStorage,
    }
  )
)
const useTheme = createSelectors(useThemeBase)

export type { ThemeState }
export default useTheme
