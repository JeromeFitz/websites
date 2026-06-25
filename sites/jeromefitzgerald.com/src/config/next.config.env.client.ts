/**
 * ref: https://vercel.com/docs/projects/environment-variables/system-environment-variables
 *
 */

const SITE = "jeromefitzgerald.com";

const envClient = Object.freeze({
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_VERCEL: !!process.env.NEXT_PUBLIC_VERCEL_URL,
  NEXT_PUBLIC__APPLE_IDENTIFIER: process.env.NEXT_PUBLIC__APPLE_IDENTIFIER ?? "",
  NEXT_PUBLIC__APPLE_TOKEN_DEVELOPER: process.env.NEXT_PUBLIC__APPLE_TOKEN_DEVELOPER ?? "",
  NEXT_PUBLIC__BASE_URL: `https://${process.env.NEXT_PUBLIC__SITE ?? SITE}`,
  NEXT_PUBLIC__FATHOM_SITE_ID: process.env.NEXT_PUBLIC__FATHOM_SITE_ID ?? "",
  NEXT_PUBLIC__SITE: process.env.NEXT_PUBLIC__SITE ?? SITE,
  NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  NODE_ENV: (process.env.NODE_ENV ?? "development") as "development" | "production" | "test",
  OVERRIDE_CACHE: ["1", "on", "true", "yes"].includes(
    (process.env.OVERRIDE_CACHE ?? "").toLowerCase(),
  ),
  VERCEL_ENV: (process.env.VERCEL_ENV ?? "development") as "development" | "production" | "preview",
});

export { envClient };
