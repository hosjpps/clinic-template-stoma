import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { priceCategories } from '@/content/prices';
import { doctors } from '@/content/doctors';
import BookingDialog from '@/components/forms/BookingDialog';

export const metadata: Metadata = {
  title: 'Имплантация зубов',
  description:
    'Имплантация зубов под ключ. Современные импланты от ведущих производителей. All-on-4/All-on-6.',
};

const IMPLANT_PROCEDURES = [
  'Установка импланта под ключ (имплант + коронка)',
  'All-on-4 — несъёмный протез на 4 имплантах',
  'All-on-6 — несъёмный протез на 6 имплантах',
  'Костная пластика (остеопластика)',
  'Синус-лифтинг закрытый и открытый',
  'Временная коронка на имплант',
  'Постоянная коронка на имплант (циркониевая / металлокерамика)',
  'Снятие и диагностика имплантата',
];

// TODO: replace with actual doctor IDs from content/doctors.ts
const implantDoctorIds: string[] = [];

export default function ImplantatsiyaPage() {
  const hirurgiyaCategory = priceCategories.find((c) => c.id === 'hirurgiya');
  const ortopediyaCategory = priceCategories.find((c) => c.id === 'ortopediya');

  const implantItems = [
    ...(hirurgiyaCategory?.items.filter((i) =>
      i.name.toLowerCase().includes('имплант')
    ) ?? []),
    ...(ortopediyaCategory?.items.filter((i) =>
      i.name.toLowerCase().includes('имплант')
    ) ?? []),
  ];

  const pageDoctors = doctors.filter((d) => implantDoctorIds.includes(d.id));

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-primary">Главная</a>
        <span className="mx-2">›</span>
        <a href="/uslugi/" className="hover:text-primary">Услуги</a>
        <span className="mx-2">›</span>
        <span className="text-primary">Имплантация</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="uppercase tracking-widest text-accent text-xs mb-3">Направление</p>
        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
          Имплантация зубов
        </h1>
        <p className="text-lg text-text-muted mb-6">
          Восстановление утраченных зубов имплантатами под ключ — надёжно, эстетично, с гарантией от 5 лет.
        </p>
        <BookingDialog triggerLabel="Записаться на консультацию" />
      </div>

      {/* О направлении */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">О направлении</h2>
        <div className="space-y-4 text-text-muted leading-relaxed">
          <p>
            Имплантация — это золотой стандарт восстановления утраченных зубов. В отличие от съёмных протезов
            и мостовидных конструкций, имплантат вживляется в кость и функционирует как естественный корень
            зуба: нагрузка передаётся на кость, предотвращая её убыль. Наши специалисты работают с проверенными
            системами имплантации от ведущих мировых производителей. {/* TODO: уточнить бренды у клиники */}
          </p>
          <p>
            Даже при значительной убыли костной ткани мы не отказываем пациентам. Хирурги клиники выполняют
            синус-лифтинг (закрытый и открытый) и остеопластику, восстанавливая объём кости до уровня,
            необходимого для безопасной установки. Протоколы All-on-4 и All-on-6 позволяют фиксировать
            несъёмный протез на всю челюсть уже в день или на следующий день после операции — решение
            для пациентов с полной адентией или при необходимости одновременного удаления всех зубов.
          </p>
          <p>
            Лечение начинается с консультации и компьютерной томографии — трёхмерного снимка, который
            позволяет точно спланировать угол и глубину установки, выбрать оптимальный диаметр импланта
            и спрогнозировать результат. После приживления (2–6 месяцев, в зависимости от плотности кости)
            ортопед изготавливает постоянную коронку из циркония или металлокерамики. На все
            установленные нами имплантаты действует гарантия от 5 лет.
          </p>
        </div>
      </section>

      {/* Что входит */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Что входит в направление</h2>
        <ul className="space-y-2">
          {IMPLANT_PROCEDURES.map((item) => (
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
              {implantItems.map((item, idx) => (
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
