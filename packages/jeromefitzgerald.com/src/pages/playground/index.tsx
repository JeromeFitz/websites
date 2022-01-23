// import { BigHead } from '@bigheads/core'
import type { ToastData, ToastType } from '@jeromefitz/design-system/components'
import {
  Box,
  // Container,
  Flex,
  Heading,
  // RadioGroup,
  // Radio,
  RadioCardGroup,
  RadioCard,
  Section,
  Switch,
  Text,
  ButtonDemo,
  useToastDispatchers,
  AlertDialogDemo,
  PageHeading,
} from '@jeromefitz/design-system/components'
import { styled } from '@jeromefitz/design-system/stitches.config'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import _title from 'title'
import { useSound } from 'use-sound'
import { v4 as uuid } from 'uuid'

import Seo from '~components/Seo'
// import { ToastData, ToastType, useToastDispatchers } from '~components/Toast'
import { useUI } from '~context/ManagedUI'
import { Media } from '~context/Media'
// import { BIG_HEAD_PROPS } from '~lib/constants'

const properties = {
  title: 'Playground',
  seoDescription: 'Sheer Random',
}

// ToastType
const mockTypes = [
  { description: 'Description of ', value: 'error', title: 'error' },
  // { description: 'Description of ', value: 'generic', title: 'generic' },
  { description: 'Description of ', value: 'info', title: 'info' },
  // { description: 'Description of ', value: 'loading', title: 'loading' },
  { description: 'Description of ', value: 'success', title: 'success' },
  { description: 'Description of ', value: 'warning', title: 'warning' },
]
const defaultType = 'error'

const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
const mockMessages = {
  25: message.substring(0, 25),
  // 50: message.substring(0, 50),
  // 75: message.substring(0, 75),
  100: message.substring(0, 100),
  200: message.substring(0, 200),
  // 300: message.substring(0, 300),
  400: message.substring(0, 400),
}

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'flex-start',
  marginBottom: 15,
})

const Label = styled('label', {
  fontWeight: 700,
  color: '$hiContrast',
  width: 120,
  textAlign: 'right',
})

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$colors$hiContrast',
  boxShadow: `0 0 0 1px $colors$hiContrast`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px $colors$hiContrast` },
})
const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
    👋
  </motion.div>
)

const PlaygroundAlertDialog = () => {
  const dialogText = {
    dialogTrigger: 'Trigger Alert',
    //
    dialogTitle: 'Are you absolutely sure doo doo head?',
    dialogDescription: 'This action cannot be undone. ',
    //
    dialogCancel: 'Cancel',
    dialogAction: 'Action',
  }
  return (
    <Box css={{ my: '$5' }}>
      <AlertDialogDemo dialogText={dialogText} />
    </Box>
  )
}

const PlaygroundToast = () => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const [playOff] = useSound('/static/audio/pop-up-off.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const [text, textSet] = useState(mockMessages[25])
  const [type, typeSet] = useState<ToastType>(defaultType)
  const [preserve, preserveSet] = useState(false)

  const setTextSet = (v) => {
    textSet(mockMessages[v])
  }

  const typeHandleChange = (type) => {
    // console.dir(`typeHandleChange`)
    // console.dir(type)
    typeSet(type)
  }

  const preserveHandleChange = () => {
    // console.dir(`preserveHandleChange`)
    preserveSet(!preserve)
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { addToast } = useToastDispatchers()

  const notify = () => {
    toast(text, {
      duration: 3000,
      position: 'top-right',
      // Styling
      style: {},
      className: '',
      // Custom Icon
      icon: '👏',
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    })
  }

  const handleToast = () => {
    const toastItem: ToastData = {
      active: true,
      createdAt: Date.now(),
      duration: 30000,
      id: uuid(),
      message: text,
      pauseDuration: 30000,
      type,
    }
    addToast(toastItem)
  }

  const handleHotToast = () => {
    // console.dir(`handleHotToast please`)
    notify()
  }

  return (
    <Box css={{ my: '$4' }}>
      <Heading
        size="3"
        css={{ backgroundColor: '$teal11', borderRadius: '5px', m: '$3', p: '$3' }}
      >
        🍞️ Toast
      </Heading>
      <Section size="1">
        <Fieldset>
          <Flex css={{ alignItems: 'center' }}>
            <Label htmlFor="preserve">Preserve</Label>
            <Switch
              id="preserve"
              name="preserve"
              onClick={preserveHandleChange}
              css={{ marginLeft: '$4' }}
            />
          </Flex>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="name">Message</Label>
          <Input
            type="text"
            name="message"
            id="message"
            // defaultValue={text}
            value={text}
            onChange={(e) => textSet(e.target.value)}
          />
        </Fieldset>
        <Fieldset>
          <Label>Set Text</Label>
          {Object.keys(mockMessages).map((v) => {
            return (
              <ButtonDemo
                key={`db-${v}`}
                onClick={() => {
                  setTextSet(v)
                }}
                onMouseDown={() => playActive}
                onMouseUp={() => {
                  playOff()
                }}
                css={{ ml: '$2' }}
              >
                {v}
              </ButtonDemo>
            )
          })}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="name">Type</Label>
          <RadioCardGroup
            defaultValue={defaultType}
            onValueChange={typeHandleChange}
          >
            {mockTypes.map((item, itemIdx) => {
              return (
                <RadioCard
                  key={`r-${itemIdx}`}
                  value={item.value}
                  css={{ mb: '$2' }}
                  onMouseDown={() => playActive}
                  onMouseUp={() => {
                    type === item.value ? playOff() : playOn()
                  }}
                >
                  <Flex css={{ alignItems: 'center' }}>
                    <Text
                      size="3"
                      css={{ fontWeight: '500', lineHeight: '1.2', mr: '$6' }}
                    >
                      {_title(item.title)}
                    </Text>
                  </Flex>
                </RadioCard>
              )
            })}
          </RadioCardGroup>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="name">Radix Toast</Label>
          <ButtonDemo
            onClick={() => {
              handleToast()
            }}
            onMouseDown={() => playActive}
            onMouseUp={() => {
              playOff()
            }}
          >
            Create
          </ButtonDemo>
        </Fieldset>{' '}
        <Fieldset>
          <Label htmlFor="name">Hot Toast</Label>
          <ButtonDemo
            variant="gray"
            onClick={() => {
              handleHotToast()
            }}
            onMouseDown={() => playActive}
            onMouseUp={() => {
              playOff()
            }}
          >
            Create
          </ButtonDemo>
        </Fieldset>
      </Section>
    </Box>
  )
}

const PlaygroundAvatar = () => {
  return (
    <>
      <Box
        css={{
          backgroundColor: '$loContrast',
          border: '1px solid $hiContrast',
          borderRadius: '$round',
          height: '3rem',
          width: '3rem',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/static/images/bighead--jerome--dizzy.svg`}
          alt={`bighead--jerome`}
        />
      </Box>
      {/* <BigHead {...BIG_HEAD_PROPS} /> */}
    </>
  )
}

const Playground = () => {
  const url = 'https://jeromefitzgerald.com/playground'
  const title = 'Playground'
  const description =
    'This is just a “safe-haven” for Components that are currently being worked on.'

  const seo = {
    title: title,
    description: description,
    canonical: url,
    noindex: true,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <>
      <Seo {...seo} />
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />

      <h4>
        <>
          <Media at="xs">
            {(className, renderChildren) => {
              // fresnel-at-xs
              // console.dir(`className: ${className}`)
              return (
                <>
                  {renderChildren ? (
                    <>
                      <Text>
                        Hello <code>{className}</code>! <WavingHand />
                      </Text>
                    </>
                  ) : null}
                </>
              )
            }}
          </Media>
          <Media greaterThan="xs">
            {(className, renderChildren) => {
              // fresnel-greaterThan-xs
              // console.dir(`!className: ${className}`)
              return (
                <>
                  {renderChildren ? (
                    <>
                      <Text>
                        Hello <code>{className}</code>! <WavingHand />
                      </Text>
                    </>
                  ) : null}
                </>
              )
            }}
          </Media>
        </>
      </h4>
      <PlaygroundAlertDialog />
      <PlaygroundToast />
      <PlaygroundAvatar />
    </>
  )
}

export default Playground
