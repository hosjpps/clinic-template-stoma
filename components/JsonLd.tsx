import { clinic } from "@/content/clinic";

const SITE_URL = "https://example.vercel.app"; // TODO: replace with clinic domain

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    name: `Стоматология ${clinic.name}`,
    legalName: clinic.legalName,
    url: `${SITE_URL}/`,
    telephone: clinic.phones[0].value,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: "Москва",
      postalCode: clinic.address.postalCode,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.address.lat,
      longitude: clinic.address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: clinic.hours[0].open || "09:00",
        closes: clinic.hours[0].close || "20:00",
      },
    ],
    aggregateRating: clinic.rating.reviews > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: clinic.rating.value.toFixed(1),
          reviewCount: clinic.rating.reviews,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card, QR",
    medicalSpecialty: "Dentistry",
    hasMap: clinic.social.yandexMapsId
      ? `https://yandex.ru/maps/org/${clinic.social.yandexMapsId}`
      : undefined,
    foundingDate: String(clinic.founded),
  };

  // Content is derived from typed TS constants — not user input — so serialisation is safe.
  // All values come from content/clinic.ts which is edited by the developer, not end users.
  const json = JSON.stringify(data);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
