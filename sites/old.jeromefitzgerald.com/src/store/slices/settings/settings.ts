import { produce } from 'immer'
import { NamedSet } from 'zustand/middleware'

import type { StoreState } from '~store/useStore'

import type { ISettings } from './settings.types'

const initialState: Omit<ISettings, 'commandMenuOpenSet'> = {
  commandMenuOpen: false,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Settings = (set: NamedSet<StoreState>, get: any) => {
  const { commandMenuOpen } = initialState
  return {
    commandMenuOpen,
    commandMenuOpenSet: (s?: boolean) =>
      set(
        produce((state: StoreState) => {
          state.commandMenuOpen = !!s ? s : !state.commandMenuOpen
        }),
        false,
        // @note(zustand) https://github.com/pmndrs/zustand/issues/705#issuecomment-1023693991
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'commandMenuOpenSet'
      ),
  }
}

export { Settings }
