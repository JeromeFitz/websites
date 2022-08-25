import { CommandItem } from '@jeromefitz/design-system'
import { useCommandState } from 'cmdk'

const SubItem = ({ children, ...props }) => {
  const cmd = useCommandState((state) => state)
  const search = useCommandState((state) => state.search)
  console.dir(`cmd`)
  console.dir(cmd)
  console.dir(`search`)
  console.dir(search)
  if (!search) return null
  return <CommandItem {...props}>{children}</CommandItem>
}

export { SubItem }
