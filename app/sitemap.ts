import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://example.vercel.app"; // TODO: replace with clinic domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE}/uslugi/`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    ...[
      "implantatsiya",
      "ortodontiya",
      "terapiya",
      "ortopediya",
      "hirurgiya",
      "detskaya",
    ].map((slug) => ({
      url: `${BASE}/uslugi/${slug}/`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    {
      url: `${BASE}/politika-konfidencialnosti/`,
      priority: 0.1,
      changeFrequency: "yearly",
    },
    {
      url: `${BASE}/soglasie-na-obrabotku-pd/`,
      priority: 0.1,
      changeFrequency: "yearly",
    },
  ];
}
