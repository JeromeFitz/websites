import { envClient as env } from "next-config/env.client";

const nextSeo = { url: `https://${env.NEXT_PUBLIC__SITE}` };
const domain = new URL(nextSeo.url);

const isExternalUrl = (href: string | string[]) =>
  !href.includes(domain.hostname.replace("www.", "")) || href.includes("bsky.app");

export { isExternalUrl };
