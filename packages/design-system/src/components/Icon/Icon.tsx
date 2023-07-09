'use client'
import {
  ArrowUturnLeftIcon as ArrowUturnLeftHero,
  BookOpenIcon as BookOpenIconHero,
  CloudIcon as CloudIconHero,
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
  BookmarkIcon as BookmarkIconRadix,
  BookmarkFilledIcon as BookmarkFilledIconRadix,
  CalendarIcon as CalendarIconRadix,
  CaretDownIcon as CaretDownIconRadix,
  CaretLeftIcon as CaretLeftIconRadix,
  CaretRightIcon as CaretRightIconRadix,
  CaretSortIcon as CaretSortIconRadix,
  CaretUpIcon as CaretUpIconRadix,
  ChatBubbleIcon as ChatBubbleIconRadix,
  CheckIcon as CheckIconRadix,
  CheckCircledIcon as CheckCircledIconRadix,
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
  Pencil1Icon as Pencil1IconRadix,
  Pencil2Icon as Pencil2IconRadix,
  QuoteIcon as QuoteIconRadix,
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
  TwitterLogoIcon as TwitterLogoIconRadix,
} from '@radix-ui/react-icons'
// } from '@radix-ui/react-icons/dist/react-icons.esm'

import { cx } from '../../utils/cx'
// import { Slot } from '@radix-ui/react-slot'

import { IconProps } from './Icon.types'

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
const twHeroToRadixIcon = 'mt-[1px] w-[1rem] [&>path]:stroke-[1.5]'

const ArchiveIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a cardboard box that holds archives.'}
  >
    <ArchiveIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ArrowLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing an arrow that is pointing to the left.'}
  >
    <ArrowLeftIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ArrowRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing an arrow that is pointing to the right.'}
  >
    <ArrowRightIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ArrowTopRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow pointing diagonally towards the top right.'
    }
  >
    <ArrowTopRightIconRadix role="info" {...props} />
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
      role="info"
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
    <BellIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const BookmarkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bookmark. An outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair.'
    }
  >
    <BookmarkIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const BookmarkFilledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bookmark. A filled in outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair.'
    }
  >
    <BookmarkFilledIconRadix role="info" {...props} />
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
      role="info"
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
    <CalendarIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CaretDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing down.'}
  >
    <CaretDownIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CaretLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing left.'}
  >
    <CaretLeftIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CaretRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing right.'}
  >
    <CaretRightIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CaretSortIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a caret sort. It is two carets with their points away from one another, pointing in opposite directions vertically.'
    }
  >
    <CaretSortIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CaretUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a caret. Its point is pointing up.'}
  >
    <CaretUpIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ChatBubbleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chat bubble. It is a rounded rectangle with no text within it, and a small upside down triangle as part of the rounded rectangle outline toward the bottom right which would point to someone or something talking.'
    }
  >
    <ChatBubbleIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CheckIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a checkmark.'}>
    <CheckIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CheckCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a checkmark in a circle.'}>
    <CheckCircledIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ChevronDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a chevron that is pointed down.'}
  >
    <ChevronDownIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ChevronLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chevron that is pointed left. So kind of like a less than sign.'
    }
  >
    <ChevronLeftIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ChevronRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a chevron that is pointed right. So kind of like a greater than sign.'
    }
  >
    <ChevronRightIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ChevronUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing a chevron that is pointed up.'}
  >
    <ChevronUpIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ClockIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a clock. It is a circular clock with the hour hand at the four and minute at the twelve.'
    }
  >
    <ClockIconRadix role="info" {...props} />
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
      role="info"
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
    <Cross1IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const Cross2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an -x. It is a smaller -x than the letter itself.'
    }
  >
    <Cross2IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const CrossCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon representing a crossmark in a circle.'}>
    <CrossCircledIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const DesktopIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a desktop computer. An outline of a large computer monitor sitting on a stand.'
    }
  >
    <DesktopIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const EnterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow that is pointing at an area that exhibits movement towards, or into.'
    }
  >
    <EnterIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const EnvelopeOpenIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an envelope that is in the process of being opened.'
    }
  >
    <EnvelopeOpenIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ExclamationTriangleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an exclamation mark in an octagon. Like a stop sign  with an exclamation mark.'
    }
  >
    <ExclamationTriangleIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ExitIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow that is pointing out of an area that exhibits movement away from, or out of.'
    }
  >
    <ExitIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ExternalLinkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an arrow pointing diagonally towards the top right corner of the screen.'
    }
  >
    <ExternalLinkIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const FileTextIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a piece of paper. There are 4 lines representing text and a folded top right corner.'
    }
  >
    <FileTextIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const FontBoldIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a font bold. It is a capital letter -B with a font weight of bold or 700.'
    }
  >
    <FontBoldIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const FontItalicIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a font italic. It is a capital letter -I with that is slanted to the right, or with emphasis.'
    }
  >
    <FontItalicIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const GearIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a gear which is a cog with eight tooth like parts around the edge of its wheel.'
    }
  >
    <GearIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const GitHubLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon that is an outline of an Octocat. An Octocat is an octopus cat hybrid with a cat head and octopus body. It is cute and not hideous despite how it may come off. This is the logo of GitHub.'
    }
  >
    <GitHubLogoIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const HamburgerMenuIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing three horizontal lines with some equal spacing between. Kind of like a hamburger where the top and bottom one are the bun, and the middle one is the meat (or plant based product if you prefer).'
    }
  >
    <HamburgerMenuIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const HomeIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a home. It is a straight forward view of a home with an angled roof, no windows, and a door slightly off-center to the right.'
    }
  >
    <HomeIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const IdCardIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an ID. A long rectangle like card with a shaded interior box for an image and some lines symbolizing text to its right.'
    }
  >
    <IdCardIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ImageIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing an image. A square outline with two rollling hills with a sun in the sky between the crests.'
    }
  >
    <ImageIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const InfoCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || 'An icon representing the letter &lsquo;i&lsquo; in a circle.'}
  >
    <InfoCircledIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const InstagramLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Instagram. A rounded rectangle with a circle in the middle representing a camera lens and to its upper right a small dot which would be its flash.'
    }
  >
    <InstagramLogoIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const Link1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a link. An outline of two links of a chain intersecting.'
    }
  >
    <Link1IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const LinkedInLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of LinkedIn. A solid rounded rectangle with the letters -i and -n outlined within.'
    }
  >
    <LinkedInLogoIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const ListBulletIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a bulleted list. It is three bullet points with a line to the right of each symbolizing text.'
    }
  >
    <ListBulletIconRadix role="info" {...props} />
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
      role="info"
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
    <MagnifyingGlassIconRadix role="info" {...props} />
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
      role="info"
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
      role="info"
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
    <MoonIconRadix role="info" {...props} />
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
      role="info"
      {...props}
    />
  </AccessibleIcon>
)

const Pencil1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a pencil. An outline of a pencil that is diagonal with its tip pointing down and to the left.'
    }
  >
    <Pencil1IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const Pencil2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a pencil writing on a piece of paper. An outline of a pencil coming from the top right corner of the paper with no hand attached.'
    }
  >
    <Pencil2IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const QuoteIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a quotation mark. An outline of a two quotation marks that would typically end a quote..'
    }
  >
    <QuoteIconRadix role="info" {...props} />
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
      role="info"
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
    <Share1IconRadix role="info" {...props} />
  </AccessibleIcon>
)

const SpeakerModerateIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a single speaker point to the right with single curved line symbolizing moderate noise coming from it.'
    }
  >
    <SpeakerModerateIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const SpeakerOffIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a single speaker pointed to the right with an -x next to it representing that it is off, or muted.'
    }
  >
    <SpeakerOffIconRadix role="info" {...props} />
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
      className="fill:bg-black dark:fill:bg-white"
      width="17px"
      height="17px"
      viewBox="0 0 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="info"
      {...props}
    >
      <defs></defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-303.000000, -5776.000000)" fill="currentColor">
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
    <StarIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const StrikethroughIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing a strikethrough. It is a capital letter -U with a line drawn horizontally across its center.'
    }
  >
    <StrikethroughIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const SunIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the sun. In this instance though the sun is a circle with eight small rays of light shining in a circlular pattern around it.'
    }
  >
    <SunIconRadix role="info" {...props} />
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
      role="info"
      {...props}
    />
  </AccessibleIcon>
)

const TextAlignCenterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || 'An icon ...'}>
    <TextAlignCenterIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const TextAlignJustifyIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align justify. Three separate lines of equal length.'
    }
  >
    <TextAlignJustifyIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const TextAlignLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align left. Three separate lines of varying length, left aligned.'
    }
  >
    <TextAlignLeftIconRadix role="info" {...props} />
  </AccessibleIcon>
)

const TextAlignRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing text align right. Three separate lines of varying length, right aligned.'
    }
  >
    <TextAlignRightIconRadix role="info" {...props} />
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
      role="info"
      {...props}
    />
  </AccessibleIcon>
)

const TwitterLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      'An icon representing the logo of Twitter. An outline of a blue bird that is facing to the right chirping.'
    }
  >
    <TwitterLogoIconRadix role="info" {...props} />
  </AccessibleIcon>
)

export {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  ArrowUturnLeftIcon,
  BellIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  BookOpenIcon,
  CalendarIcon,
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
  HamburgerMenuIcon,
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
  Pencil1Icon,
  Pencil2Icon,
  QuoteIcon,
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
  TicketIcon,
  TwitterLogoIcon,
}
