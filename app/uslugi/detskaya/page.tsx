import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { priceCategories } from '@/content/prices';
import { doctors } from '@/content/doctors';
import BookingDialog from '@/components/forms/BookingDialog';

export const metadata: Metadata = {
  title: 'Детская стоматология',
  description:
    'Заботливый приём детей с 3 лет. Лечение в игровой форме, опытные врачи.',
};

const DETSKAYA_PROCEDURES = [
  'Консультация детского стоматолога',
  'Лечение кариеса молочных зубов',
  'Профилактика — фторирование и герметизация фиссур',
  'Удаление молочных зубов',
  'Лечение пульпита у детей',
  'Пластинки для исправления прикуса',
  'Игровая адаптация перед лечением',
];

// TODO: replace with actual doctor IDs from content/doctors.ts
const detskayaDoctorIds: string[] = [];

const KIDS_KEYWORDS = ['детск', 'молочн', 'ребенк'];

export default function DetskayaPage() {
  const terapiyaCategory = priceCategories.find((c) => c.id === 'terapiya');
  const hirurgiyaCategory = priceCategories.find((c) => c.id === 'hirurgiya');

  const kidsItems = [
    ...(terapiyaCategory?.items ?? []),
    ...(hirurgiyaCategory?.items ?? []),
  ].filter((i) =>
    KIDS_KEYWORDS.some((kw) => i.name.toLowerCase().includes(kw))
  );

  const pageDoctors = doctors.filter((d) => detskayaDoctorIds.includes(d.id));

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-primary">Главная</a>
        <span className="mx-2">›</span>
        <a href="/uslugi/" className="hover:text-primary">Услуги</a>
        <span className="mx-2">›</span>
        <span className="text-primary">Детская стоматология</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="uppercase tracking-widest text-accent text-xs mb-3">Направление</p>
        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
          Детская стоматология
        </h1>
        <p className="text-lg text-text-muted mb-6">
          Заботливый приём детей с 3 лет — без страха, в игровой форме, с опытными врачами.
        </p>
        <BookingDialog triggerLabel="Записаться на консультацию" />
      </div>

      {/* О направлении */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">О направлении</h2>
        <div className="space-y-4 text-text-muted leading-relaxed">
          <p>
            Детская стоматология — это специализированный приём от врачей с многолетним
            опытом работы с детьми. Наши специалисты умеют найти подход к самым маленьким
            и тревожным пациентам: знакомство с оборудованием, рассказ в игровой форме,
            мягкие движения — всё это делает визит к стоматологу спокойным событием,
            а не стрессом.
          </p>
          <p>
            Мы принимаем детей с 3 лет. Лечение молочных зубов так же важно, как и постоянных:
            ранняя потеря молочного зуба нарушает формирование прикуса и может потребовать
            дорогостоящего ортодонтического лечения в будущем. Для лечения используем адаптированные
            анестетики и материалы в детских дозировках. При необходимости врач направит на консультацию
            для проведения лечения под седацией — это возможно для детей с выраженной дентофобией
            или при необходимости большого объёма вмешательства за один приём.
          </p>
          <p>
            Профилактика — приоритет детской стоматологии. Герметизация фиссур (запечатывание
            бороздок на жевательных зубах) снижает риск кариеса в самых уязвимых местах.
            Профессиональное фторирование укрепляет эмаль и повышает её кислотостойкость.
            Уже с 6–7 лет ортодонт оценивает формирование прикуса и при необходимости
            назначает съёмные пластинки — на этом этапе исправить нарушения проще и быстрее
            всего.
          </p>
        </div>
      </section>

      {/* Что входит */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Что входит в направление</h2>
        <ul className="space-y-2">
          {DETSKAYA_PROCEDURES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Прайс */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Прайс по направлению</h2>
        {kidsItems.length > 0 ? (
          <div className="border border-border rounded-[12px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-bg-soft border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Услуга</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-primary whitespace-nowrap">Цена</th>
                </tr>
              </thead>
              <tbody>
                {kidsItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-bg-soft'}
                  >
                    <td className="px-4 py-2 text-sm">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-right whitespace-nowrap font-medium">
                      {item.price !== null
                        ? `${item.price.toLocaleString('ru-RU')} ₽${item.unit ? ' ' + item.unit : ''}`
                        : 'уточняйте'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-border rounded-[12px] bg-bg-soft p-6 text-center text-text-muted">
            Цены на детский приём уточняются на консультации
          </div>
        )}
        <p className="text-xs text-text-muted mt-3">
          Цены актуальны на момент публикации. Окончательная стоимость уточняется на консультации.
        </p>
      </section>

      {/* Врачи */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Наши врачи в этом направлении</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pageDoctors.map((doctor) => (
            <div key={doctor.id} className="border border-border rounded-[12px] overflow-hidden bg-white">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-full aspect-square object-cover object-top"
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-primary leading-tight">{doctor.name}</p>
                <p className="text-xs text-text-muted mt-1">{doctor.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-bg-soft p-8 rounded-[16px] mt-12 text-center">
        <h3 className="font-serif text-2xl text-primary mb-2">Готовы записаться?</h3>
        <p className="text-text-muted mb-6">Бесплатная консультация и план лечения</p>
        <BookingDialog triggerLabel="Записаться" />
      </div>
    </main>
  );
}
