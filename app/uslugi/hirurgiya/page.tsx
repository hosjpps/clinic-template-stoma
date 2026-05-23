import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { priceCategories } from '@/content/prices';
import { doctors } from '@/content/doctors';
import BookingDialog from '@/components/forms/BookingDialog';

export const metadata: Metadata = {
  title: 'Хирургия',
  description:
    'Удаление зубов любой сложности, костная пластика, цистэктомия, ЧЛХ.',
};

const HIRURGIYA_PROCEDURES = [
  'Удаление зуба простое (в т.ч. подвижного)',
  'Удаление сложное — с применением бормашины',
  'Удаление дистопированного или ретинированного зуба',
  'Удаление зуба мудрости (верхнего и нижнего «8»)',
  'Резекция верхушки корня с цистэктомией',
  'Френулопластика (пластика уздечки губы/языка)',
  'Костная пластика (остеопластика)',
  'Синус-лифтинг закрытый',
];

// TODO: replace with actual doctor IDs from content/doctors.ts
const hirurgiyaDoctorIds: string[] = [];

export default function HirurgiyaPage() {
  const category = priceCategories.find((c) => c.id === 'hirurgiya');

  // Exclude implant-specific items — they belong to the implantatsiya page
  const items = (category?.items ?? []).filter(
    (i) => !i.name.toLowerCase().includes('имплант')
  );

  const pageDoctors = doctors.filter((d) => hirurgiyaDoctorIds.includes(d.id));

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-primary">Главная</a>
        <span className="mx-2">›</span>
        <a href="/uslugi/" className="hover:text-primary">Услуги</a>
        <span className="mx-2">›</span>
        <span className="text-primary">Хирургия</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="uppercase tracking-widest text-accent text-xs mb-3">Направление</p>
        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
          Хирургия
        </h1>
        <p className="text-lg text-text-muted mb-6">
          Удаление зубов, костная пластика и челюстно-лицевая хирургия — бережно и безопасно.
        </p>
        <BookingDialog triggerLabel="Записаться на консультацию" />
      </div>

      {/* О направлении */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">О направлении</h2>
        <div className="space-y-4 text-text-muted leading-relaxed">
          <p>
            Хирургическая стоматология включает плановые и неотложные вмешательства любой
            сложности. Удаление зубов мы проводим максимально атравматично: при необходимости —
            с распиловкой, с минимальной травмой десны и кости, с наложением саморассасывающихся
            швов. Особое внимание уделяем сложным удалениям: дистопированным (смещённым)
            и ретинированным (не прорезавшимся) зубам, включая зубы мудрости нижней челюсти.
          </p>
          <p>
            Наши специалисты занимаются резекцией верхушек корней с удалением кист, цистэктомией,
            лечением перикоронарита, коррекцией уздечки губы и языка (особенно актуально
            для детей с нарушением речи или грудного вскармливания). При необходимости
            хирурги клиники выполняют синус-лифтинг открытым доступом и масштабную костную
            пластику в рамках подготовки к имплантации.
          </p>
          <p>
            Послеоперационное сопровождение включено в стоимость вмешательства: пациент получает
            подробные рекомендации, при необходимости — назначение антибиотиков и обезболивающих,
            плановый осмотр через 7–10 дней для снятия швов.
          </p>
        </div>
      </section>

      {/* Что входит */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-primary mb-4">Что входит в направление</h2>
        <ul className="space-y-2">
          {HIRURGIYA_PROCEDURES.map((item) => (
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
          Цены актуальны на момент публикации. Цены на имплантацию — в разделе{' '}
          <a href="/uslugi/implantatsiya/" className="underline hover:text-primary">Имплантация</a>.
          Окончательная стоимость уточняется на консультации.
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
