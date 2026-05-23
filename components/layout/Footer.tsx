import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clinic } from '@/content/clinic';
import { services } from '@/content/services';

// Instagram is not available in lucide-react v1.16.0 — using inline SVG
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-soft border-t border-border" aria-label="Подвал сайта">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="text-primary shrink-0"
            >
              <path
                d="M16 3C12 3 9 6 9 10c0 2 .5 3.5 1 5l1 4c.5 2 1.5 3 3 3h4c1.5 0 2.5-1 3-3l1-4c.5-1.5 1-3 1-5 0-4-3-7-7-7z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M13 22c0 3 1 6 3 6s3-3 3-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p className="font-bold text-lg text-primary tracking-tight leading-none">{clinic.name}</p>
              <p className="text-[10px] text-text-muted uppercase tracking-widest">стоматология</p>
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Семейная стоматология {clinic.address.district ? `в ${clinic.address.district}` : ''}
          </p>
          <address className="not-italic text-sm text-text-muted leading-relaxed">
            {clinic.address.street},<br />
            {clinic.address.district}, {clinic.address.city}
          </address>
          {clinic.rating.votes > 0 && (
            <p className="text-sm text-primary font-medium">
              ★ {clinic.rating.value} на Я.Картах · {clinic.rating.votes} голосов
            </p>
          )}
        </div>

        {/* Col 2: Services */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest text-text-muted mb-4">Услуги</p>
          <ul className="flex flex-col gap-2" role="list">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contacts */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest text-text-muted mb-4">Контакты</p>
          <ul className="flex flex-col gap-3" role="list">
            {clinic.phones.map((p) => (
              <li key={p.value} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${p.value}`}
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${clinic.email}`}
                className="text-sm text-primary/80 hover:text-primary transition-colors"
              >
                {clinic.email}
              </a>
            </li>
            {clinic.hours[0] && clinic.hours[0].open && (
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-primary/80">
                  {clinic.hours[0].day} {clinic.hours[0].open}–{clinic.hours[0].close}
                  {clinic.hours[1] && !clinic.hours[1].open && <><br />Вс — закрыто</>}
                </span>
              </li>
            )}
            {clinic.metro.length > 0 && (
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <span className="text-sm text-primary/80">
                  {clinic.metro[0].name} — {clinic.metro[0].walkMin} мин пешком
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Col 4: Social */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest text-text-muted mb-4">Мы в сети</p>
          <ul className="flex flex-col gap-3" role="list">
            {clinic.social.instagram && (
              <li>
                <a
                  href={`https://www.instagram.com/${clinic.social.instagram}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  <InstagramIcon className="h-4 w-4 text-accent" />
                  @{clinic.social.instagram}
                </a>
              </li>
            )}
            {clinic.social.yandexMapsId && (
              <li>
                <a
                  href={`https://yandex.ru/maps/org/${clinic.social.yandexMapsId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  Я.Карты — отзывы и маршрут
                </a>
              </li>
            )}
            {clinic.phones[0] && (
              <li>
                <a
                  href={`https://wa.me/${clinic.phones[0].value.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-muted">
          <span>
            © {clinic.founded}–{new Date().getFullYear()} {clinic.legalName} · ИНН {clinic.inn} · Лицензия {clinic.license}
          </span>
          <span className="flex flex-wrap gap-3 items-center">
            <Link
              href="/politika-konfidencialnosti/"
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/soglasie-na-obrabotku-pd/"
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Согласие на обработку ПД
            </Link>
            <span>Имеются противопоказания. Проконсультируйтесь со специалистом.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
