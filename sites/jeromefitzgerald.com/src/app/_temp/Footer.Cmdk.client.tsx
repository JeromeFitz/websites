/**
 * @note(next) 🔥 🔥 🔥 🔥 🔥
 *
 * for some reason if any thing is `use client`
 * in footer it breaks tailwind
 *
 * GOOD TIMES figuring this one out
 *
 */
// 'use client'
import { Button, Kbd } from '@radix-ui/themes'

// import { useStore as _useStore } from '@/store/index'

// const useStore = () => {
//   return _useStore((store) => ({
//     isCmdkOpen: store.isCmdkOpen,
//     isCmdkOpenSet: store.isCmdkOpenSet,
//   }))
// }

function FooterCmdkClient() {
  // const { isCmdkOpenSet } = useStore()
  return (
    <Button
      // className="gap-[0.5rem] group-hover:cursor-pointer lg:flex"
      className="gap-[0.5rem] group-hover:bg-transparent lg:flex"
      highContrast
      // onClick={() => {
      //   isCmdkOpenSet()
      // }}
      radius="medium"
      size="3"
      variant="ghost"
    >
      <span className="gap-[0.25rem] lg:flex">
        <Kbd className="font-mono">⌘ + K</Kbd>
      </span>
      <p className="text-[var(--mauve-12)]">Command Menu</p>
    </Button>
  )
}

export { FooterCmdkClient }
