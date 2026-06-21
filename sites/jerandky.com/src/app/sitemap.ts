import _orderBy from "lodash/orderBy";
import { MetadataRoute } from "next";

/**
 * @todo(next) dynamic
 */
const siteUrl = "https://jeromefitzgerald.com";
const lastModified = new Date();

const root = [""];
const podcasts = ["jer-and-ky-and-guest", "knockoffs"];

// oxlint-disable-next-line typescript/no-unused-vars
const sitemapRoot = root.map((slug) => ({
  lastModified,
  url: `${siteUrl}`,
}));
const sitemapPodcasts = podcasts.map((slug) => ({
  lastModified,
  url: `${siteUrl}/podcasts/${slug}`,
}));

function sitemap(): MetadataRoute.Sitemap {
  return _orderBy(
    [
      // {
      //   url: `${siteUrl}`,
      //   lastModified: new Date(),
      // },
      ...sitemapRoot,
      ...sitemapPodcasts,
    ],
    ["url"],
    ["asc"],
  );
}

export default sitemap;
