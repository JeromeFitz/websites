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

import { cx } from "../../utils/cx";
import type { IconProps } from "./icon.types";

const twHeroToRadixIcon = "icon-custom mt-[1px] w-[1rem] [&>path]:stroke-[1.5] icon-hero";

const ArrowUturnLeftIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const BookOpenIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <BookOpenIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const CloudIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <CloudIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const HashtagIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <HashtagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const LanguageIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <LanguageIconHero
      className={cx(twHeroToRadixIcon, className, "icon-book")}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const LocationMarkerIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <MapPinIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const MapIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <MapIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const MicrophoneIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <MicrophoneIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const MusicalNoteIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <MusicalNoteIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const ReturnIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <ArrowUturnLeftHero
      className={cx(twHeroToRadixIcon, "-scale-x-100 rotate-180", className)}
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const TagIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <TagIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const ThreadsLogoIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <AtSymbolIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
);

const TicketIcon = ({ className, label, ...props }: IconProps) => (
  <>
    <TicketIconHero
      className={cx(twHeroToRadixIcon, className)}
      data-icon="hero"
      aria-hidden="true"
      {...props}
    />
    {label && <span className="sr-only">{label}</span>}
  </>
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
