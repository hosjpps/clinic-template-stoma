import { clinic } from '@/content/clinic';

const STATS = [
  { value: `${new Date().getFullYear() - clinic.founded}+`, label: 'лет работы' },
  { value: '—', label: 'врачей' },           // TODO: заменить на реальное число врачей
  { value: `${clinic.rating.value}`, label: `★ Я.Карты · ${clinic.rating.votes} голосов` },
  { value: '—', label: 'услуг в прайсе' },   // TODO: заменить после scrape:prices
];

export default function TrustStrip() {
  return (
    <div
      className="bg-bg-soft border-y border-border py-8"
      aria-label="Ключевые показатели клиники"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <dt className="font-serif text-3xl lg:text-4xl font-semibold text-primary">{s.value}</dt>
              <dd className="text-sm text-text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
