import create from 'zustand'
import { persist } from 'zustand/middleware'

import createSelectors from './createSelectors'
import type { IAudio } from './slices'
import { Audio } from './slices'

const useAudioBase = create<IAudio>(
  persist(
    (set, get) => {
      return {
        ...Audio(set, get),
      }
    },
    {
      name: 'audio',
      getStorage: () => localStorage,
    }
  )
)
const useAudio = createSelectors(useAudioBase)

export default useAudio
