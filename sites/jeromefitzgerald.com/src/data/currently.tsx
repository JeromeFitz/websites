import {
  BookOpenIcon,
  InfoCircledIcon,
  MusicalNoteIcon,
  TicketIcon,
} from "@jeromefitz/ds/components/icon";
import type { ComponentType } from "react";

import { CurrentlyBookClient } from "@/components/currently/currently.book.client";
import { CurrentlyEvent } from "@/components/currently/currently.event";
import { CurrentlyItemWrapper } from "@/components/currently/currently.item.wrapper";
import { CurrentlyMusicClient } from "@/components/currently/currently.music.client";

type CurrentlyItem = {
  apiUrl: string;
  className?: string;
  color: string;
  component: ComponentType<any>;
  href: string;
  icon: ComponentType<any>;
  id: string;
  isActive: boolean;
  prefetch: boolean;
  title: string;
  titleSub: string;
};

const currently: CurrentlyItem[] = [
  {
    apiUrl: "",
    className: "",
    color: "pink",
    component: CurrentlyItemWrapper,
    href: "/currently/cooking",
    icon: InfoCircledIcon,
    id: "cooking",
    isActive: false,
    prefetch: false,
    title: "Cooking…",
    titleSub: "N/A",
  },
  {
    apiUrl: "/api/v2/music/recent-played-albums?limit=1&offset=0",
    color: "orange",
    component: CurrentlyMusicClient,
    href: "/currently/listening-to",
    icon: MusicalNoteIcon,
    id: "listening",
    isActive: true,
    prefetch: false,
    title: "I’m Listening To…",
    titleSub: "Jessica Pratt – Here In The Pitch",
  },
  {
    apiUrl: "/api/v1/books/currently-reading",
    color: "mint",
    component: CurrentlyBookClient,
    href: "/currently/reading",
    icon: BookOpenIcon,
    id: "reading",
    isActive: true,
    prefetch: false,
    title: "I’m Reading…",
    titleSub: "Jaime Loftus – Raw Dog: The Naked Truth About Hot Dogs",
  },
  {
    apiUrl: "",
    color: "purple",
    component: CurrentlyEvent,
    href: "/events",
    icon: TicketIcon,
    id: "events",
    isActive: true,
    prefetch: true,
    title: "My Next Event…",
    titleSub: "Not Scheduled – See Past Events",
  },
];

export { currently };
