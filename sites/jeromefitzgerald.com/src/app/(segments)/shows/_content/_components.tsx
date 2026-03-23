import { Box, Em, Flex, Separator, Text } from '@radix-ui/themes'

import { ContentAlexOJerome, DataAlexOJerome } from './alex-o-jerome'
import { ContentJeromeAnd, DataJeromeAnd } from './jerome-and'
import { ContentTheDeathShow, DataTheDeathShow } from './the-death-show'
import { ContentWarpZone, DataWarpZone } from './warp-zone'

const ContentComponents = {
  'alex-o-jerome': ContentAlexOJerome,
  'jerome-and': ContentJeromeAnd,
  'the-death-show': ContentTheDeathShow,
  'warp-zone': ContentWarpZone,
}
const DataComponents = {
  'alex-o-jerome': DataAlexOJerome,
  'jerome-and': DataJeromeAnd,
  'the-death-show': DataTheDeathShow,
  'warp-zone': DataWarpZone,
}

const ContentTitle = ({ title }: { title: string }) => {
  return (
    <Box
      gridColumnStart={{ initial: '1', md: '1' }}
      gridColumnEnd={{ initial: '13', md: '13' }}
    >
      <Flex gap="5" direction="column" width="100%">
        <Text className="" size={{ initial: '7', md: '9' }}>
          <Em>{title}</Em>
        </Text>
      </Flex>
      <Separator orientation="horizontal" size="4" className="my-4" />
    </Box>
  )
}

const ContentSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      gridColumnStart={{ initial: '1', md: '1' }}
      gridColumnEnd={{ initial: '13', md: '13' }}
    >
      {children}
    </Box>
  )
}

// biome-ignore lint/style/useComponentExportOnlyModules: todo
export { ContentComponents, ContentSection, ContentTitle, DataComponents }
