import { MapPin, Phone, Mail, Clock, Train } from 'lucide-react';
import { clinic } from '@/content/clinic';
import BookingForm from '@/components/forms/BookingForm';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 bg-bg-soft"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-heading"
          className="font-serif text-primary text-3xl sm:text-4xl mb-10"
        >
          Запись и контакты
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT: booking form */}
          <div className="bg-white border border-border p-8 rounded-[16px]">
            <BookingForm />
          </div>

          {/* RIGHT: contacts + map */}
          <div className="flex flex-col gap-6">
            <address className="not-italic flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-primary">Адрес</p>
                  <p className="text-sm text-text-muted">
                    {clinic.address.street}, {clinic.address.district},{' '}
                    {clinic.address.city}
                  </p>
                </div>
              </div>

              {clinic.phones.map(p => (
                <div key={p.value} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${p.value}`}
                    className="text-sm font-medium text-primary hover:text-accent transition-colors"
                  >
                    {p.display}{' '}
                    <span className="text-text-muted font-normal">— {p.label}</span>
                  </a>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${clinic.email}`}
                  className="text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  {clinic.email}
                </a>
              </div>

              {clinic.hours[0] && clinic.hours[0].open && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-primary">Режим работы</p>
                    <p className="text-sm text-text-muted">
                      {clinic.hours[0].day} {clinic.hours[0].open}–{clinic.hours[0].close}
                    </p>
                    {clinic.hours[1] && !clinic.hours[1].open && (
                      <p className="text-sm text-text-muted">
                        {clinic.hours[1].day} — выходной
                      </p>
                    )}
                  </div>
                </div>
              )}

              {clinic.metro.length > 0 && (
                <div className="flex items-center gap-3">
                  <Train className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                  <p className="text-sm text-text-muted">
                    м. {clinic.metro[0].name} — {clinic.metro[0].walkMin} мин пешком
                    {clinic.metro[0].walkMeters ? ` (${clinic.metro[0].walkMeters} м)` : ''}
                  </p>
                </div>
              )}
            </address>

            {/* Map iframe — uses address from clinic.ts */}
            <div className="rounded-[12px] overflow-hidden border border-border bg-bg-soft">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(`${clinic.address.city} ${clinic.address.street}`)}&z=16`}
                width="100%"
                height="280"
                loading="lazy"
                title={`Карта клиники ${clinic.name}`}
                style={{ border: 0, display: 'block' }}
                aria-label={`Карта с расположением клиники ${clinic.name}`}
              />
              <noscript>
                <div className="p-8 text-center text-text-muted">
                  <p className="mb-3">Карта не доступна без JavaScript.</p>
                  {clinic.social.yandexMapsId && (
                    <a
                      href={`https://yandex.ru/maps/org/${clinic.social.yandexMapsId}`}
                      className="text-accent underline"
                    >
                      Открыть карту на Я.Картах →
                    </a>
                  )}
                </div>
              </noscript>
            </div>

            {clinic.social.yandexMapsId && (
              <a
                href={`https://yandex.ru/maps/org/${clinic.social.yandexMapsId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-primary transition-colors"
              >
                Открыть маршрут на Я.Картах →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
