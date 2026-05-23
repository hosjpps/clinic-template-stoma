import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { priceCategories } from '@/content/prices';
import { doctors } from '@/content/doctors';
import BookingDialog from '@/components/forms/BookingDialog';

export const metadata: Metadata = {
  title: 'Ортодонтия',
  description:
    'Брекеты, элайнеры и пластинки для ровной улыбки. Взрослые и дети.',
};

const ORTODONT_PROCEDURES = [
  'Консультация ортодонта с составлением плана лечения по 3D-КТ',
  'Брекет-система металлическая (1 или 2 челюсти)',
  'Брекет-система керамическая (1 или 2 челюсти)',
  'Брекет-система сапфировая',
  'Элайнеры (прозрачные каппы)',
  'Пластинки съёмные для детей',
  'Ретейнеры и ретенционные капы после лечения',
];

// TODO: replace with actual doctor IDs from content/doctors.ts
const ortodontDoctorIds: string[] = [];

export default function OrtodontiyaPage() {
  const category = priceCategories.find((c) => c.id === 'ortodontiya');
  const items = category?.items ?? [];
  const pageDoctors = doctors.filter((d) => ortodontDoctorIds.includes(d.id));

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-primary">Главная</a>
        <span className="mx-2">›</span>
        <a href="/uslugi/" className="hover:text-primary">Услуги</a>
        <span className="mx-2">›</span>
        <span className="text-primary">Ортодонтия</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="uppercase tracking-widest text-accent text-xs mb-3">Направление</p>
        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
          Ортодонтия
        </h1>
        <p className="text-lg text-text-muted mb-6">
          Брекеты, элайнеры и пластинки для ровной улыбки — для взрослых и детей.
        </p>
        <BookingDialog triggerLabel="Записаться на консультацию" />
      </div>

      {/* О направлении */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">О направлении</h2>
        <div className="space-y-4 text-text-muted leading-relaxed">
          <p>
            Ортодонтия занимается исправлением неправильного прикуса и положения зубов. Это не только
            эстетика: правильный прикус снижает нагрузку на суставы, улучшает жевательную функцию
            и уменьшает риск быстрого истирания зубов. Лечение начинается с консультации, снятия слепков
            и изучения 3D-снимка — это позволяет точно диагностировать нарушение и выбрать оптимальную систему.
          </p>
          <p>
            Для взрослых мы предлагаем полный спектр систем: металлические брекеты — самый доступный
            и проверенный вариант; керамические и сапфировые — почти незаметны на зубах; лингвальные —
            крепятся с внутренней стороны зубного ряда. Элайнеры (прозрачные съёмные капы) подходят
            для лёгкой и средней степени нарушения прикуса и практически незаметны в повседневной
            жизни. Средний срок активного лечения — от 12 до 24 месяцев в зависимости от сложности случая.
          </p>
          <p>
            Для детей от 6 лет применяются съёмные пластинки — они помогают направить рост челюсти
            на этапе смены зубов, когда кость ещё достаточно пластична. После завершения активной фазы
            лечения — ретейнеры или ретенционные капы, которые фиксируют достигнутый результат
            на долгие годы.
          </p>
        </div>
      </section>

      {/* Что входит */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Что входит в направление</h2>
        <ul className="space-y-2">
          {ORTODONT_PROCEDURES.map((item) => (
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
        <div className="border border-border rounded-[12px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-soft border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Услуга</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-primary whitespace-nowrap">Цена</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
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
