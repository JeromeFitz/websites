import create from 'zustand'
import { persist } from 'zustand/middleware'

import createSelectors from './createSelectors'
import type { ITheme } from './slices'
import { Theme } from './slices'

const useThemeBase = create<ITheme>(
  persist(
    (set, get) => {
      return {
        ...Theme(set, get),
      }
    },
    {
      name: 'theme-storage',
      getStorage: () => localStorage,
    }
  )
)
const useTheme = createSelectors(useThemeBase)

export default useTheme
