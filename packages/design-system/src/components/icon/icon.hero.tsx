"use client";

import {
  ArrowUturnLeftIcon as ArrowUturnLeftHero,
  AtSymbolIcon as AtSymbolIconHero,
  BookOpenIcon as BookOpenIconHero,
  CloudIcon as CloudIconHero,
  HashtagIcon as HashtagIconHero,
  LanguageIcon as LanguageIconHero,
  MapIcon as MapIconHero,
  MapPinIcon as MapPinIconHero,
  MicrophoneIcon as MicrophoneIconHero,
  MusicalNoteIcon as MusicalNoteIconHero,
  TagIcon as TagIconHero,
  TicketIcon as TicketIconHero,
} from "@heroicons/react/24/outline";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";

import { cx } from "../../utils/cx";
import type { IconProps } from "./icon.types";

const twHeroToRadixIcon = "icon-custom mt-[1px] w-[1rem] [&>path]:stroke-[1.5] icon-hero";

const ArrowUturnLeftIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a reply arrow. It is a left facing arrow with the right tail-end pointing curving down."
    }
  >
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const BookOpenIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing an open book. It has curved pages as it if is being actively read. There are no lines on the pages, this book icon is an outline."
    }
  >
    <BookOpenIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const CloudIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label || "An icon representing a cloud. An outline of a fluffy cloud with some puffy pieces."
    }
  >
    <CloudIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const HashtagIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a hashtag or pound symbol. It has a thin weight and slightly slanted to the right."
    }
  >
    <HashtagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const LanguageIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a map. This is a page that has been folded into four equal rectangles each kind of askew a bit to show depth. There is nothing within this outline of the four rectangles."
    }
  >
    <LanguageIconHero
      className={cx(twHeroToRadixIcon, className, "icon-book")}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const LocationMarkerIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a location marker. This is an outline marker that looks like a guitar pick with the bigger side at the top with a circle cut out."
    }
  >
    <MapPinIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const MapIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a map. This is a page that has been folded into four equal rectangles each kind of askew a bit to show depth. There is nothing within this outline of the four rectangles."
    }
  >
    <MapIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const MicrophoneIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a microphone. This type of microphone is something a podcaster would use. A pill shaped outline of a microphone cradled in a sold outlined stand."
    }
  >
    <MicrophoneIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const MusicalNoteIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a musical note. This is a beamed note, with the second note slightly higher on the scale."
    }
  >
    <MusicalNoteIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const ReturnIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a return arrow. It is a left facing arrow with the right tail-end curving up."
    }
  >
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, "-scale-x-100 rotate-180", className)}
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const TagIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a tag. The tag has a small hole where it would be attached to something larger, and is pointing towards the upper left."
    }
  >
    <TagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const ThreadsLogoIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing the logo of Threads (the BlueSky/X by Instagram... It is an at symbol (@) that is done all in one line that results in a sans serif open top -a."
    }
  >
    <AtSymbolIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

const TicketIcon = ({ className, label, ...props }: IconProps) => (
  <AccessibleIcon
    label={
      label ||
      "An icon representing a ticket. It is a singular ticket that looks like it is from a 50/50 raffle where the recipient keeps the larger piece, and there is a perforated top half that can be ripped off to go into the larger pool."
    }
  >
    <TicketIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      role="img"
      {...props}
    />
  </AccessibleIcon>
);

export {
  ArrowUturnLeftIcon,
  BookOpenIcon,
  CloudIcon,
  HashtagIcon,
  LanguageIcon,
  LocationMarkerIcon,
  MapIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  ReturnIcon,
  TagIcon,
  ThreadsLogoIcon,
  TicketIcon,
};
