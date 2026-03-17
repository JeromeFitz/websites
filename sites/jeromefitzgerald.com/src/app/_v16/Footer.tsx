import { Box, Em, Flex, Grid, Strong, Text } from '@radix-ui/themes'

import { socials } from '@/data/socials'

import { LinkButton } from './LinkButton'

const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      asChild
      className="bg-accent-4"
      direction="column"
      gap="2"
      px={{ initial: '3', md: '6' }}
      py={{ initial: '3', md: '6' }}
      width="100%"
    >
      <footer>{children}</footer>
    </Flex>
  )
}

const FooterGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid gap="2" columns={{ initial: '12', md: '12' }} width="100%">
      {children}
    </Grid>
  )
}

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterGrid>
        <Box
          className="hidden!"
          gridColumnStart={{ initial: '1', md: '6' }}
          gridColumnEnd={{ initial: '13', md: '9' }}
        >
          <Flex direction="column" gap="3">
            <Text>
              <Strong>Internal Links</Strong>
              <Em className="block">... Kewl website.</Em>
            </Text>
            {socials.map((social) => {
              if (!social.active) return null

              return (
                <LinkButton
                  href={social.url}
                  icon={social.icon}
                  key={`footer--social--${social.id}`}
                  text={social.title}
                />
              )
            })}
          </Flex>
        </Box>
        <Box
          gridColumnStart={{ initial: '1', md: '10' }}
          gridColumnEnd={{ initial: '13', md: '13' }}
        >
          <Flex direction="column" gap="3">
            <Text>
              <Strong>External Links</Strong>
              <Em className="block">... Eh, not very “active.”</Em>
            </Text>
            {socials.map((social) => {
              if (!social.active) return null

              return (
                <LinkButton
                  href={social.url}
                  icon={social.icon}
                  key={`footer--social--${social.id}`}
                  text={social.title}
                />
              )
            })}
          </Flex>
        </Box>
      </FooterGrid>
    </FooterWrapper>
  )
}

export { Footer }
