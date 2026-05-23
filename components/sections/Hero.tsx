import { Phone } from 'lucide-react';
import { ClinicImage } from '@/components/ClinicImage';
import { clinic } from '@/content/clinic';

export default function Hero() {
  const phone = clinic.phones[0];
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-8 lg:gap-12 items-center">

          {/* Photo — first on mobile, right on desktop */}
          <div className="order-first lg:order-last lg:col-span-6">
            <ClinicImage
              src="/images/clinic/clinic-01.jpg"
              alt={`Кабинет стоматологии ${clinic.name}`}
              priority
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="w-full aspect-[4/5] object-cover rounded-[16px] ring-4 ring-accent-soft/40"
            />
          </div>

          {/* Text — second on mobile, left on desktop */}
          <div className="order-last lg:order-first lg:col-span-7 flex flex-col gap-6">
            <p className="text-accent text-xs font-medium uppercase tracking-widest">
              Стоматология · {clinic.address.district || clinic.address.city}
            </p>
            <h1
              id="hero-heading"
              className="font-serif text-primary text-5xl lg:text-7xl leading-[1.05]"
            >
              Здоровая улыбка для всей семьи
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-xl">
              Семейная клиника. Терапия, имплантация, брекеты для детей и взрослых.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2">
              {clinic.social.yandexMapsId && clinic.rating.reviews > 0 && (
                <a
                  href={`https://yandex.ru/maps/org/${clinic.social.yandexMapsId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs bg-white border border-border text-primary hover:text-accent transition-colors"
                >
                  <span className="text-yellow-500" aria-hidden="true">★</span>
                  {clinic.rating.value} · {clinic.rating.reviews} отзывов
                </a>
              )}
              {clinic.rating.award && (
                <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs bg-white border border-border text-primary">
                  {clinic.rating.award}
                </span>
              )}
              <span className="flex items-center rounded-full px-3 py-1.5 text-xs bg-white border border-border text-primary">
                С {clinic.founded} года
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 h-11 bg-primary text-primary-foreground rounded-md text-base font-medium hover:bg-primary/90 transition-colors"
              >
                Записаться онлайн
              </a>
              <a
                href={`tel:${phone.value}`}
                className="inline-flex items-center justify-center gap-2 px-6 h-11 border border-primary text-primary rounded-md text-base font-medium hover:bg-bg-soft transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone.display}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
