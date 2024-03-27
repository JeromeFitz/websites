'use client'
import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { ArchiveIcon } from '@jeromefitz/ds/components/Icon/index'

import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '@/config/build-info.json'
const { isBranchMain, prerelease, version } = buildInfo

function FooterVersionClient({ isLoading }) {
  return (
    <Skeleton loading={isLoading}>
      <Button asChild highContrast radius="medium" size="3" variant="ghost">
        <Anchor
          className="gap-2 group-hover:cursor-pointer lg:flex"
          href={'/colophon'}
        >
          <ArchiveIcon className="text-gray-12" />
          <Text className="text-gray-12 font-mono" size="2">
            v{isBranchMain ? version : `${version}-${prerelease}`}
          </Text>
        </Anchor>
      </Button>
    </Skeleton>
  )
}

export { FooterVersionClient }
