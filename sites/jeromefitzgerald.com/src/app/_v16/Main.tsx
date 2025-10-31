import { Box } from '@radix-ui/themes'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box asChild pt={{ initial: '8', md: '9' }}>
      <main>{children}</main>
    </Box>
  )
}

export { Main }
