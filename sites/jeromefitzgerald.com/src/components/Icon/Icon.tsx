'use client'

import type { IconProps } from './Icon.types'

import {
  ArrowUturnLeftIcon as ArrowUturnLeftHero,
  AtSymbolIcon as AtSymbolIconHero,
  BookOpenIcon as BookOpenIconHero,
  CloudIcon as CloudIconHero,
  HashtagIcon as HashtagIconHero,
  MapIcon as MapIconHero,
  MapPinIcon as MapPinIconHero,
  MicrophoneIcon as MicrophoneIconHero,
  MusicalNoteIcon as MusicalNoteIconHero,
  TagIcon as TagIconHero,
  TicketIcon as TicketIconHero,
} from '@heroicons/react/24/outline'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import {
  ArchiveIcon as ArchiveIconRadix,
  ArrowLeftIcon as ArrowLeftIconRadix,
  ArrowRightIcon as ArrowRightIconRadix,
  ArrowTopRightIcon as ArrowTopRightIconRadix,
  BellIcon as BellIconRadix,
  BookmarkFilledIcon as BookmarkFilledIconRadix,
  BookmarkIcon as BookmarkIconRadix,
  CalendarIcon as CalendarIconRadix,
  CameraIcon as CameraIconRadix,
  CaretDownIcon as CaretDownIconRadix,
  CaretLeftIcon as CaretLeftIconRadix,
  CaretRightIcon as CaretRightIconRadix,
  CaretSortIcon as CaretSortIconRadix,
  CaretUpIcon as CaretUpIconRadix,
  ChatBubbleIcon as ChatBubbleIconRadix,
  CheckCircledIcon as CheckCircledIconRadix,
  CheckIcon as CheckIconRadix,
  ChevronDownIcon as ChevronDownIconRadix,
  ChevronLeftIcon as ChevronLeftIconRadix,
  ChevronRightIcon as ChevronRightIconRadix,
  ChevronUpIcon as ChevronUpIconRadix,
  ClockIcon as ClockIconRadix,
  Cross1Icon as Cross1IconRadix,
  Cross2Icon as Cross2IconRadix,
  CrossCircledIcon as CrossCircledIconRadix,
  DesktopIcon as DesktopIconRadix,
  EnterIcon as EnterIconRadix,
  EnvelopeOpenIcon as EnvelopeOpenIconRadix,
  ExclamationTriangleIcon as ExclamationTriangleIconRadix,
  ExitIcon as ExitIconRadix,
  ExternalLinkIcon as ExternalLinkIconRadix,
  FileTextIcon as FileTextIconRadix,
  FontBoldIcon as FontBoldIconRadix,
  FontItalicIcon as FontItalicIconRadix,
  GearIcon as GearIconRadix,
  GitHubLogoIcon as GitHubLogoIconRadix,
  HamburgerMenuIcon as HamburgerMenuIconRadix,
  HomeIcon as HomeIconRadix,
  IdCardIcon as IdCardIconRadix,
  ImageIcon as ImageIconRadix,
  InfoCircledIcon as InfoCircledIconRadix,
  InstagramLogoIcon as InstagramLogoIconRadix,
  Link1Icon as Link1IconRadix,
  LinkedInLogoIcon as LinkedInLogoIconRadix,
  ListBulletIcon as ListBulletIconRadix,
  MagnifyingGlassIcon as MagnifyingGlassIconRadix,
  MoonIcon as MoonIconRadix,
  OpenInNewWindowIcon as OpenInNewWindowIconRadix,
  Pencil1Icon as Pencil1IconRadix,
  Pencil2Icon as Pencil2IconRadix,
  PlayIcon as PlayIconRadix,
  PlusCircledIcon as PlusCircledIconRadix,
  PlusIcon as PlusIconRadix,
  QuoteIcon as QuoteIconRadix,
  ReloadIcon as ReloadIconRadix,
  Share1Icon as Share1IconRadix,
  SpeakerModerateIcon as SpeakerModerateIconRadix,
  SpeakerOffIcon as SpeakerOffIconRadix,
  StarIcon as StarIconRadix,
  StrikethroughIcon as StrikethroughIconRadix,
  SunIcon as SunIconRadix,
  TextAlignCenterIcon as TextAlignCenterIconRadix,
  TextAlignJustifyIcon as TextAlignJustifyIconRadix,
  TextAlignLeftIcon as TextAlignLeftIconRadix,
  TextAlignRightIcon as TextAlignRightIconRadix,
  TrashIcon as TrashIconRadix,
  UpdateIcon as UpdateIconRadix,
} from '@radix-ui/react-icons'

import { cx } from '@/utils/cx'

/**
 * @hack(icon)
 *  Hero Icons to Radix-UI mimicry
 *  A few icons we need are not in Radix-UI
 *
 * @note(icon)
 *  Still allow _this_ hack to be overriden
 *  Override by passing tailwind className to Icon.XYZ
 *
 */
const twHeroToRadixIcon =
  'icon-custom mt-[1px] w-[1rem] [&>path]:stroke-[1.5] icon-hero'
// const twHeroToRadixIcon = ''

const AmazonLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Amazon. Which is a sans serif letter -a, with a curved arrow underline pointing to the right that mimics a smirk or smiley face.'
    }
  >
    <svg
      className="dark:fill:bg-white fill:bg-black"
      height="17px"
      role="img"
      version="1.1"
      viewBox="3 1 252 260"
      width="17px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g fill="none" fill-rule="evenodd">
        <path
          d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
          fill="currentColor"
          fill-rule="nonzero"
        ></path>
        <path
          d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
          fill="currentColor"
        ></path>
        <path
          d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
          fill="currentColor"
          fill-rule="nonzero"
        ></path>
        <path
          d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  </AccessibleIcon>
)

const AppleLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing the logo of Apple. Which is an apple.'}
  >
    <svg
      className="dark:fill:bg-white fill:bg-black"
      height="17px"
      role="img"
      version="1.1"
      viewBox="0 0 814 1000"
      width="17px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
        fill="currentColor"
        id="apple-icon"
      ></path>
    </svg>
  </AccessibleIcon>
)

const ArchiveIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a cardboard box that holds archives.'}
  >
    <ArchiveIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ArrowLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing an arrow that is pointing to the left.'}
  >
    <ArrowLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ArrowRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing an arrow that is pointing to the right.'}
  >
    <ArrowRightIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ArrowTopRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow pointing diagonally towards the top right.'
    }
  >
    <ArrowTopRightIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ArrowUturnLeftIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a reply arrow. It is a left facing arrow with the right tail-end pointing curving down.'
    }
  >
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const BellIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bell. A very small outline of the Liberty Bell without the crack.'
    }
  >
    <BellIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const BlueskyLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Bluesky. Which is a silhouette of a butterfly.'
    }
  >
    <svg
      className="dark:fill:bg-white fill:bg-black"
      height="17px"
      role="img"
      version="1.1"
      viewBox="0 0 568 501"
      width="17px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"
        fill="currentColor"
        id="bluesky-icon"
      ></path>
    </svg>
  </AccessibleIcon>
)

const BookmarkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bookmark. An outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair.'
    }
  >
    <BookmarkIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const BookmarkFilledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bookmark. A filled in outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair.'
    }
  >
    <BookmarkFilledIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const BookOpenIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an open book. It has curved pages as it if is being actively read. There are no lines on the pages, this book icon is an outline.'
    }
  >
    <BookOpenIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const CalendarIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a calendar. It has two hooks as if the paper is a rip-off type of calendar per month, with small shaded squares with symbolizing days of a month.'
    }
  >
    <CalendarIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CameraIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a camera. It has a rounded rectangular shape with a flash in the upper left and its larger lens on the right.'
    }
  >
    <CameraIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CaretDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing down.'}
  >
    <CaretDownIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CaretLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing left.'}
  >
    <CaretLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CaretRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing right.'}
  >
    <CaretRightIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CaretSortIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a caret sort. It is two carets with their points away from one another, pointing in opposite directions vertically.'
    }
  >
    <CaretSortIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CaretUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing up.'}
  >
    <CaretUpIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ChatBubbleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chat bubble. It is a rounded rectangle with no text within it, and a small upside down triangle as part of the rounded rectangle outline toward the bottom right which would point to someone or something talking.'
    }
  >
    <ChatBubbleIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CheckIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a checkmark.'}>
    <CheckIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CheckCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a checkmark in a circle.'}>
    <CheckCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ChevronDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a chevron that is pointed down.'}
  >
    <ChevronDownIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ChevronLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chevron that is pointed left. So kind of like a less than sign.'
    }
  >
    <ChevronLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ChevronRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chevron that is pointed right. So kind of like a greater than sign.'
    }
  >
    <ChevronRightIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ChevronUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a chevron that is pointed up.'}
  >
    <ChevronUpIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ClockIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a clock. It is a circular clock with the hour hand at the four and minute at the twelve.'
    }
  >
    <ClockIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CloudIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a cloud. An outline of a fluffy cloud with some puffy pieces.'
    }
  >
    <CloudIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const Cross1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an -x. It is a larger -x than the letter itself.'
    }
  >
    <Cross1IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const Cross2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an -x. It is a smaller -x than the letter itself.'
    }
  >
    <Cross2IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const CrossCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a crossmark in a circle.'}>
    <CrossCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const DesktopIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a desktop computer. An outline of a large computer monitor sitting on a stand.'
    }
  >
    <DesktopIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const EnterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow that is pointing at an area that exhibits movement towards, or into.'
    }
  >
    <EnterIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const EnvelopeOpenIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an envelope that is in the process of being opened.'
    }
  >
    <EnvelopeOpenIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ExclamationTriangleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an exclamation mark in an octagon. Like a stop sign  with an exclamation mark.'
    }
  >
    <ExclamationTriangleIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ExitIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow that is pointing out of an area that exhibits movement away from, or out of.'
    }
  >
    <ExitIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ExternalLinkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow pointing diagonally towards the top right corner of the screen.'
    }
  >
    <ExternalLinkIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const FileTextIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a piece of paper. There are 4 lines representing text and a folded top right corner.'
    }
  >
    <FileTextIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const FontBoldIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a font bold. It is a capital letter -B with a font weight of bold or 700.'
    }
  >
    <FontBoldIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const FontItalicIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a font italic. It is a capital letter -I with that is slanted to the right, or with emphasis.'
    }
  >
    <FontItalicIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const GearIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a gear which is a cog with eight tooth like parts around the edge of its wheel.'
    }
  >
    <GearIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const GitHubLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon that is an outline of an Octocat. An Octocat is an octopus cat hybrid with a cat head and octopus body. It is cute and not hideous despite how it may come off. This is the logo of GitHub.'
    }
  >
    <GitHubLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const GooglePodcastsLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing the logo for Google Podcasts.'}
  >
    <svg
      className="dark:fill:bg-white fill:bg-black"
      height="17px"
      role="img"
      version="1.1"
      viewBox="0 0 400 400"
      width="17px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g stroke-linecap="round" stroke-width="48.5">
        <path d="m24.26 186.32v27.351" stroke="currentColor"></path>
        <path d="m375.74 186.32v27.351" stroke="currentColor"></path>
        <path d="m112.13 104.27v89.46m0 74.645v27.351" stroke="currentColor"></path>
        <path d="m287.87 206.26v89.46m0-191.46v27.351" stroke="currentColor"></path>
        <path
          d="m200 127.06v145.87m0-248.68v27.351m0 296.78v27.351"
          stroke="currentColor"
        ></path>
      </g>
    </svg>
  </AccessibleIcon>
)

const HamburgerMenuIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing three horizontal lines with some equal spacing between. Kind of like a hamburger where the top and bottom one are the bun, and the middle one is the meat (or plant based product if you prefer).'
    }
  >
    <HamburgerMenuIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const HashtagIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a hashtag or pound symbol. It has a thin weight and slightly slanted to the right.'
    }
  >
    <HashtagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const HomeIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a home. It is a straight forward view of a home with an angled roof, no windows, and a door slightly off-center to the right.'
    }
  >
    <HomeIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const IdCardIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an ID. A long rectangle like card with a shaded interior box for an image and some lines symbolizing text to its right.'
    }
  >
    <IdCardIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ImageIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an image. A square outline with two rollling hills with a sun in the sky between the crests.'
    }
  >
    <ImageIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const InfoCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing the letter &lsquo;i&lsquo; in a circle.'}
  >
    <InfoCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const InstagramLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Instagram. A rounded rectangle with a circle in the middle representing a camera lens and to its upper right a small dot which would be its flash.'
    }
  >
    <InstagramLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const Link1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a link. An outline of two links of a chain intersecting.'
    }
  >
    <Link1IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const LinkedInLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of LinkedIn. A solid rounded rectangle with the letters -i and -n outlined within.'
    }
  >
    <LinkedInLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ListBulletIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bulleted list. It is three bullet points with a line to the right of each symbolizing text.'
    }
  >
    <ListBulletIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const LocationMarkerIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a location marker. This is an outline marker that looks like a guitar pick with the bigger side at the top with a circle cut out.'
    }
  >
    <MapPinIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const MagnifyingGlassIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a magnifying glass. It is an outline of a diagnol mangifying glass with its handle towards the bottom right, and the glass part towards the upper left.'
    }
  >
    <MagnifyingGlassIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const MapIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a map. This is a page that has been folded into four equal rectangles each kind of askew a bit to show depth. There is nothing within this outline of the four rectangles.'
    }
  >
    <MapIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const MicrophoneIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a microphone. This type of microphone is something a podcaster would use. A pill shaped outline of a microphone cradled in a sold outlined stand.'
    }
  >
    <MicrophoneIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const MoonIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the moon. This moon is a half crescent with the left half missing. In that missing moon space towards the upper left are three stars in the distance in an isosceles triangle pattern.'
    }
  >
    <MoonIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const MusicalNoteIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a musical note. This is a beamed note, with the second note slightly higher on the scale.'
    }
  >
    <MusicalNoteIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const OpenInNewWindowIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing opening a link in a new window..'}
  >
    <OpenInNewWindowIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const Pencil1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a pencil. An outline of a pencil that is diagonal with its tip pointing down and to the left.'
    }
  >
    <Pencil1IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const Pencil2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a pencil writing on a piece of paper. An outline of a pencil coming from the top right corner of the paper with no hand attached.'
    }
  >
    <Pencil2IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const PlayIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a play button.'}>
    <PlayIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const PlusCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a plus symbol that is circled.'}
  >
    <PlusCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const PlusIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a plus symbol.'}>
    <PlusIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const QuoteIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a quotation mark. An outline of a two quotation marks that would typically end a quote.'
    }
  >
    <QuoteIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ReloadIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a reload action. A circle that almost completes but leading into the gap is an arrow.'
    }
  >
    <ReloadIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ReturnIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a return arrow. It is a left facing arrow with the right tail-end curving up.'
    }
  >
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, 'rotate-180 -scale-x-100', className)}
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const Share1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a social share. An outline of a circle with two beams attached to two other circles symbolizing a share across a network.'
    }
  >
    <Share1IconRadix role="img" {...props} />
  </AccessibleIcon>
)

const SpeakerModerateIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a single speaker point to the right with single curved line symbolizing moderate noise coming from it.'
    }
  >
    <SpeakerModerateIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const SpeakerOffIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a single speaker pointed to the right with an -x next to it representing that it is off, or muted.'
    }
  >
    <SpeakerOffIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const SpotifyLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Spotify. A circle with what looks like three sound waves slightly off centered to the right and pointed upward. The waves start small and get larger, and encompass about 90% of the circle with some space around them. The slightly off centered icon rankles a lot of people.'
    }
  >
    <svg
      className="dark:fill:bg-white fill:bg-black"
      height="17px"
      role="img"
      version="1.1"
      viewBox="0 0 17 17"
      width="17px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs></defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="currentColor" transform="translate(-303.000000, -5776.000000)">
          <g id="Group-12" transform="translate(130.000000, 5758.000000)">
            <path
              d="M186.918938,25.6499188 C186.791639,25.6499188 186.662513,25.6199721 186.542015,25.5566271 C181.694705,23.0107486 176.716441,24.5350881 176.666699,24.5507213 C176.238816,24.685837 175.782712,24.4483949 175.647799,24.0208164 C175.512785,23.5930349 175.750024,23.1369309 176.177704,23.0019168 C176.407126,22.9295371 181.857432,21.2615547 187.297282,24.1186763 C187.694304,24.3272883 187.847185,24.8182117 187.638573,25.2152343 C187.493408,25.4918609 187.210995,25.6499188 186.918938,25.6499188 M186.447099,27.9201858 C186.325079,28.1324523 186.102864,28.2512241 185.874457,28.2512241 C185.762892,28.2512241 185.649805,28.2229016 185.546159,28.1633127 C181.341333,25.7451393 177.105241,27.1529403 177.062909,27.1673554 C176.718166,27.2855181 176.342969,27.1019801 176.224705,26.7572374 C176.106542,26.4124946 176.290182,26.0371961 176.634925,25.9190333 C176.830746,25.8519324 181.485585,24.3058687 186.204074,27.0192459 C186.519986,27.2009566 186.62881,27.6042732 186.447099,27.9201858 M185.391553,30.272984 C185.28679,30.4471827 185.102034,30.5436213 184.912507,30.5436213 C184.814647,30.5436213 184.715366,30.5178367 184.625322,30.463628 C181.277988,28.4501923 177.310198,29.614765 177.270506,29.6267437 C176.975708,29.7157717 176.663856,29.5493897 176.57432,29.2546935 C176.484785,28.9598959 176.650456,28.6484498 176.945152,28.5585081 C177.126152,28.5032843 181.418992,27.231817 185.200909,29.5067537 C185.465151,29.6657252 185.550524,30.0087422 185.391553,30.272984 M181.5,18 C176.80557,18 173,21.8055702 173,26.5001015 C173,31.1944298 176.80557,35 181.5,35 C186.19443,35 190,31.1944298 190,26.5001015 C190,21.8055702 186.19443,18 181.5,18"
              id="spotify-icon"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </AccessibleIcon>
)

const StarIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a star. It is the outline of a star that has five points.'
    }
  >
    <StarIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const StrikethroughIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a strikethrough. It is a capital letter -U with a line drawn horizontally across its center.'
    }
  >
    <StrikethroughIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const SunIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the sun. In this instance though the sun is a circle with eight small rays of light shining in a circlular pattern around it.'
    }
  >
    <SunIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const TagIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a tag. The tag has a small hole where it would be attached to something larger, and is pointing towards the upper left.'
    }
  >
    <TagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const TextAlignCenterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon ...'}>
    <TextAlignCenterIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const TextAlignJustifyIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align justify. Three separate lines of equal length.'
    }
  >
    <TextAlignJustifyIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const TextAlignLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align left. Three separate lines of varying length, left aligned.'
    }
  >
    <TextAlignLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const TextAlignRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align right. Three separate lines of varying length, right aligned.'
    }
  >
    <TextAlignRightIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const ThreadsLogoIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Threads (the BlueSky/X by Instagram... It is an at symbol (@) that is done all in one line that results in a sans serif open top -a.'
    }
  >
    <AtSymbolIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const TicketIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a ticket. It is a singular ticket that looks like it is from a 50/50 raffle where the recipient keeps the larger piece, and there is a perforated top half that can be ripped off to go into the larger pool.'
    }
  >
    <TicketIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
)

const TrashIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a trash can. An outline of a garbage bin with a lidded handle.'
    }
  >
    <TrashIconRadix role="img" {...props} />
  </AccessibleIcon>
)

const UpdateIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon of two arrows curved in a circular fashion to show they are continuous.'
    }
  >
    <UpdateIconRadix role="img" {...props} />
  </AccessibleIcon>
)

export {
  AmazonLogoIcon,
  AppleLogoIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  ArrowUturnLeftIcon,
  BellIcon,
  BlueskyLogoIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  BookOpenIcon,
  CalendarIcon,
  CameraIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretSortIcon,
  CaretUpIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClockIcon,
  CloudIcon,
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
  DesktopIcon,
  EnterIcon,
  EnvelopeOpenIcon,
  ExclamationTriangleIcon,
  ExitIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FontBoldIcon,
  FontItalicIcon,
  GearIcon,
  GitHubLogoIcon,
  GooglePodcastsLogoIcon,
  HamburgerMenuIcon,
  HashtagIcon,
  HomeIcon,
  IdCardIcon,
  ImageIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  Link1Icon,
  LinkedInLogoIcon,
  ListBulletIcon,
  LocationMarkerIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MicrophoneIcon,
  MoonIcon,
  MusicalNoteIcon,
  OpenInNewWindowIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlayIcon,
  PlusCircledIcon,
  PlusIcon,
  QuoteIcon,
  ReloadIcon,
  ReturnIcon,
  Share1Icon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SpotifyLogoIcon,
  StarIcon,
  StrikethroughIcon,
  SunIcon,
  TagIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  ThreadsLogoIcon,
  TicketIcon,
  TrashIcon,
  UpdateIcon,
}
