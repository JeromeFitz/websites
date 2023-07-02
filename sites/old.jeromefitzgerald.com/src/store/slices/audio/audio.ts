import { produce } from 'immer'
import { NamedSet } from 'zustand/middleware'

import type { StoreState } from '~store/useStore'

import type { IAudio } from './audio.types'

// const soundBank = {
//   bite: 'bite',
//   bleep: 'bleep',
//   boop: 'boop',
//   disableSound: 'disable-sound',
//   drums909: '909-drums',
//   dunDunDun: 'dun-dun-dun',
//   enableSound: 'enable-sound',
//   fanfare: 'fanfare',
//   glugA: 'glug-a',
//   glugB: 'glug-b',
//   glug: 'glug',
//   guitarLoop: 'guitar-loop',
//   menuOpen: 'menu-open',
//   meow: 'meow',
//   pfff: 'pfff',
//   plungerImmediate: 'plunger-immediate',
//   plunger: 'plunger',
//   popDown: 'pop-down',
//   popUpOff: 'pop-up-off',
//   popUpOn: 'pop-up-on',
//   pop: 'pop',
//   risingPops: 'rising-pops',
//   switchOff: 'switch-off',
//   switchOn: 'switch-on',
// }

const initialState: Omit<IAudio, 'audioToggle'> = {
  audio: true,
  /**
   * @hack(types)
   *
   * okay, i forget what to do for dynamic types data, haha
   * not a lot of data just make it static
   */
  // sounds: Object.fromEntries(
  //   Object.keys(soundBank).map((sound) => [
  //     sound,
  //     `/static/audio/${soundBank[sound]}.mp3`,
  //   ])
  // ),
  sounds: {
    bite: '/static/audio/bite.mp3',
    bleep: '/static/audio/bleep.mp3',
    boop: '/static/audio/boop.mp3',
    disableSound: '/static/audio/disable-sound.mp3',
    drums909: '/static/audio/909-drums.mp3',
    dunDunDun: '/static/audio/dun-dun-dun.mp3',
    enableSound: '/static/audio/enable-sound.mp3',
    fanfare: '/static/audio/fanfare.mp3',
    glug: '/static/audio/glug.mp3',
    glugA: '/static/audio/glug-a.mp3',
    glugB: '/static/audio/glug-b.mp3',
    guitarLoop: '/static/audio/guitar-loop.mp3',
    menuOpen: '/static/audio/menu-open.mp3',
    meow: '/static/audio/meow.mp3',
    pfff: '/static/audio/pfff.mp3',
    plunger: '/static/audio/plunger.mp3',
    plungerImmediate: '/static/audio/plunger-immediate.mp3',
    pop: '/static/audio/pop.mp3',
    popDown: '/static/audio/pop-down.mp3',
    popUpOff: '/static/audio/pop-up-off.mp3',
    popUpOn: '/static/audio/pop-up-on.mp3',
    risingPops: '/static/audio/rising-pops.mp3',
    switchOff: '/static/audio/switch-off.mp3',
    switchOn: '/static/audio/switch-on.mp3',
  },
  volume: 0.5,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Audio = (set: NamedSet<StoreState>, get: any) => {
  const { audio, sounds, volume } = initialState
  return {
    audio,
    audioToggle: () =>
      set(
        produce((state: StoreState) => {
          state.audio = !state.audio
        }),
        false,
        // @note(zustand) https://github.com/pmndrs/zustand/issues/705#issuecomment-1023693991
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'audioToggle'
      ),

    sounds,
    volume,
  }
}

export { Audio }
