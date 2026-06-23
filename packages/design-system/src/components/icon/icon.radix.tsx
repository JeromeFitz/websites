"use client";

import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
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
  Pencil1Icon as Pencil1IconRadix,
  Pencil2Icon as Pencil2IconRadix,
  PlayIcon as PlayIconRadix,
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
  UpdateIcon as UpdateIconRadix,
} from "@radix-ui/react-icons";

import type { IconProps } from "./icon.types";

const ArchiveIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a cardboard box that holds archives."}>
    <ArchiveIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ArrowLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing an arrow that is pointing to the left."}>
    <ArrowLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ArrowRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing an arrow that is pointing to the right."}>
    <ArrowRightIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ArrowTopRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || "An icon representing an arrow pointing diagonally towards the top right."}
  >
    <ArrowTopRightIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const BellIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a bell. A very small outline of the Liberty Bell without the crack."
    }
  >
    <BellIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const BookmarkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a bookmark. An outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair."
    }
  >
    <BookmarkIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const BookmarkFilledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a bookmark. A filled in outline of the part of the bookmark that hangs at the bottom of the book. It has a small triangle cut out at the bottom for flair."
    }
  >
    <BookmarkFilledIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CalendarIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a calendar. It has two hooks as if the paper is a rip-off type of calendar per month, with small shaded squares with symbolizing days of a month."
    }
  >
    <CalendarIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CameraIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a camera. It has a rounded rectangular shape with a flash in the upper left and its larger lens on the right."
    }
  >
    <CameraIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CaretDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a caret. Its point is pointing down."}>
    <CaretDownIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CaretLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a caret. Its point is pointing left."}>
    <CaretLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CaretRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a caret. Its point is pointing right."}>
    <CaretRightIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CaretSortIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a caret sort. It is two carets with their points away from one another, pointing in opposite directions vertically."
    }
  >
    <CaretSortIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CaretUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a caret. Its point is pointing up."}>
    <CaretUpIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ChatBubbleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a chat bubble. It is a rounded rectangle with no text within it, and a small upside down triangle as part of the rounded rectangle outline toward the bottom right which would point to someone or something talking."
    }
  >
    <ChatBubbleIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CheckIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a checkmark."}>
    <CheckIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CheckCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a checkmark in a circle."}>
    <CheckCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ChevronDownIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a chevron that is pointed down."}>
    <ChevronDownIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ChevronLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a chevron that is pointed left. So kind of like a less than sign."
    }
  >
    <ChevronLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ChevronRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a chevron that is pointed right. So kind of like a greater than sign."
    }
  >
    <ChevronRightIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ChevronUpIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a chevron that is pointed up."}>
    <ChevronUpIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ClockIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a clock. It is a circular clock with the hour hand at the four and minute at the twelve."
    }
  >
    <ClockIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Cross1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || "An icon representing an -x. It is a larger -x than the letter itself."}
  >
    <Cross1IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Cross2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || "An icon representing an -x. It is a smaller -x than the letter itself."}
  >
    <Cross2IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const CrossCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a crossmark in a circle."}>
    <CrossCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const DesktopIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a desktop computer. An outline of a large computer monitor sitting on a stand."
    }
  >
    <DesktopIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const EnterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an arrow that is pointing at an area that exhibits movement towards, or into."
    }
  >
    <EnterIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const EnvelopeOpenIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || "An icon representing an envelope that is in the process of being opened."}
  >
    <EnvelopeOpenIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ExclamationTriangleIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an exclamation mark in an octagon. Like a stop sign  with an exclamation mark."
    }
  >
    <ExclamationTriangleIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ExitIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an arrow that is pointing out of an area that exhibits movement away from, or out of."
    }
  >
    <ExitIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ExternalLinkIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an arrow pointing diagonally towards the top right corner of the screen."
    }
  >
    <ExternalLinkIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const FileTextIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a piece of paper. There are 4 lines representing text and a folded top right corner."
    }
  >
    <FileTextIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const FontBoldIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a font bold. It is a capital letter -B with a font weight of bold or 700."
    }
  >
    <FontBoldIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const FontItalicIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a font italic. It is a capital letter -I with that is slanted to the right, or with emphasis."
    }
  >
    <FontItalicIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const GearIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a gear which is a cog with eight tooth like parts around the edge of its wheel."
    }
  >
    <GearIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const GitHubLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon that is an outline of an Octocat. An Octocat is an octopus cat hybrid with a cat head and octopus body. It is cute and not hideous despite how it may come off. This is the logo of GitHub."
    }
  >
    <GitHubLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const HamburgerMenuIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing three horizontal lines with some equal spacing between. Kind of like a hamburger where the top and bottom one are the bun, and the middle one is the meat (or plant based product if you prefer)."
    }
  >
    <HamburgerMenuIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const HomeIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a home. It is a straight forward view of a home with an angled roof, no windows, and a door slightly off-center to the right."
    }
  >
    <HomeIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const IdCardIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an ID. A long rectangle like card with a shaded interior box for an image and some lines symbolizing text to its right."
    }
  >
    <IdCardIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ImageIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an image. A square outline with two rollling hills with a sun in the sky between the crests."
    }
  >
    <ImageIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const InfoCircledIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing the letter &lsquo;i&lsquo; in a circle."}>
    <InfoCircledIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const InstagramLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the logo of Instagram. A rounded rectangle with a circle in the middle representing a camera lens and to its upper right a small dot which would be its flash."
    }
  >
    <InstagramLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Link1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={label || "An icon representing a link. An outline of two links of a chain intersecting."}
  >
    <Link1IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const LinkedInLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the logo of LinkedIn. A solid rounded rectangle with the letters -i and -n outlined within."
    }
  >
    <LinkedInLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const ListBulletIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a bulleted list. It is three bullet points with a line to the right of each symbolizing text."
    }
  >
    <ListBulletIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const MagnifyingGlassIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a magnifying glass. It is an outline of a diagnol mangifying glass with its handle towards the bottom right, and the glass part towards the upper left."
    }
  >
    <MagnifyingGlassIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const MoonIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the moon. This moon is a half crescent with the left half missing. In that missing moon space towards the upper left are three stars in the distance in an isosceles triangle pattern."
    }
  >
    <MoonIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Pencil1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a pencil. An outline of a pencil that is diagonal with its tip pointing down and to the left."
    }
  >
    <Pencil1IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Pencil2Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a pencil writing on a piece of paper. An outline of a pencil coming from the top right corner of the paper with no hand attached."
    }
  >
    <Pencil2IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const PlayIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon representing a play button."}>
    <PlayIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const QuoteIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a quotation mark. An outline of a two quotation marks that would typically end a quote.."
    }
  >
    <QuoteIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const Share1Icon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a social share. An outline of a circle with two beams attached to two other circles symbolizing a share across a network."
    }
  >
    <Share1IconRadix role="img" {...props} />
  </AccessibleIcon>
);

const SpeakerModerateIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a single speaker point to the right with single curved line symbolizing moderate noise coming from it."
    }
  >
    <SpeakerModerateIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const SpeakerOffIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a single speaker pointed to the right with an -x next to it representing that it is off, or muted."
    }
  >
    <SpeakerOffIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const StarIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label || "An icon representing a star. It is the outline of a star that has five points."
    }
  >
    <StarIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const StrikethroughIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a strikethrough. It is a capital letter -U with a line drawn horizontally across its center."
    }
  >
    <StrikethroughIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const SunIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the sun. In this instance though the sun is a circle with eight small rays of light shining in a circlular pattern around it."
    }
  >
    <SunIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const TextAlignCenterIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon label={label || "An icon ..."}>
    <TextAlignCenterIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const TextAlignJustifyIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label || "An icon representing text align justify. Three separate lines of equal length."
    }
  >
    <TextAlignJustifyIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const TextAlignLeftIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing text align left. Three separate lines of varying length, left aligned."
    }
  >
    <TextAlignLeftIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const TextAlignRightIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing text align right. Three separate lines of varying length, right aligned."
    }
  >
    <TextAlignRightIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const TwitterLogoIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the logo of Twitter. An outline of a blue bird that is facing to the right chirping."
    }
  >
    <TwitterLogoIconRadix role="img" {...props} />
  </AccessibleIcon>
);

const UpdateIcon = ({ label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label || "An icon of two arrows curved in a circular fashion to show they are continuous."
    }
  >
    <UpdateIconRadix role="img" {...props} />
  </AccessibleIcon>
);

export {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  BellIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
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
  MagnifyingGlassIcon,
  MoonIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlayIcon,
  QuoteIcon,
  Share1Icon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  StarIcon,
  StrikethroughIcon,
  SunIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TwitterLogoIcon,
  UpdateIcon,
};
