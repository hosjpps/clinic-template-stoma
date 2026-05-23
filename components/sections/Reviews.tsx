import { clinic } from '@/content/clinic';
import { reviews } from '@/content/reviews';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-16 bg-bg-soft"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="reviews-heading"
            className="font-serif text-primary text-3xl sm:text-4xl mb-2"
          >
            Что говорят пациенты
          </h2>
          {clinic.rating.reviews > 0 && (
            <p className="text-text-muted text-sm">
              <span className="text-yellow-500" aria-hidden="true">★</span>{' '}
              {clinic.rating.value} · {clinic.rating.reviews} отзывов на Я.Картах
              {clinic.rating.award ? ` · «${clinic.rating.award}»` : ''}
            </p>
          )}
        </div>

        {reviews.length > 0 ? (
          /* Mobile: horizontal scroll; desktop: grid */
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0">
            {reviews.map(r => (
              <article
                key={r.id}
                className="shrink-0 w-[min(80vw,320px)] md:w-auto snap-start bg-white rounded-[16px] p-6 border border-border shadow-[0_2px_12px_0_rgba(30,58,95,0.08)] flex flex-col gap-3"
              >
                <div
                  aria-label="Оценка: 5 из 5"
                  className="text-yellow-500 text-base"
                  role="img"
                >
                  ★★★★★
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-primary text-sm">{r.author}</p>
                  <time dateTime={r.date} className="text-xs text-text-muted shrink-0">
                    {formatDate(r.date)}
                  </time>
                </div>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-5">{r.text}</p>
                <p className="text-xs text-text-muted/70 mt-auto">Источник: Я.Карты</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-[16px] p-12 text-center text-text-muted">
            <p className="mb-2">Отзывы появятся после запуска скрипта.</p>
            <p className="text-xs">
              Поместите данные в <code className="bg-bg-soft px-1 rounded">../research/reviews_yandex.json</code>
              {' '}и запустите <code className="bg-bg-soft px-1 rounded">pnpm scrape:reviews</code>.
            </p>
          </div>
        )}

        {clinic.social.yandexMapsId && clinic.rating.reviews > 0 && (
          <div className="mt-8">
            <a
              href={`https://yandex.ru/maps/org/${clinic.social.yandexMapsId}/reviews/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:text-primary transition-colors"
            >
              Читать все {clinic.rating.reviews} отзывов на Я.Картах →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
