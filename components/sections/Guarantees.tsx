import { Shield, Award, Star, Calendar } from 'lucide-react';
import { clinic } from '@/content/clinic';

const GUARANTEES = [
  {
    icon: Shield,
    title: 'Гарантия на лечение',
    text: 'Письменная гарантия на все виды лечения',
  },
  {
    icon: Award,
    title: 'Лицензия МЗ РФ',
    text: clinic.license,
  },
  {
    icon: Star,
    title: `Рейтинг ${clinic.rating.value}`,
    text: clinic.rating.votes > 0
      ? `${clinic.rating.votes} оценок на Я.Картах${clinic.rating.award ? `, «${clinic.rating.award}»` : ''}`
      : 'Высокий рейтинг среди пациентов',
  },
  {
    icon: Calendar,
    title: `${new Date().getFullYear() - clinic.founded}+ лет опыта`,
    text: `Клиника работает с ${clinic.founded} года`,
  },
];

export default function Guarantees() {
  return (
    <section
      id="guarantees"
      aria-labelledby="guarantees-heading"
      className="py-16 bg-primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="guarantees-heading"
          className="font-serif text-white text-3xl lg:text-4xl mb-10"
        >
          Наши гарантии
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map(g => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl mt-4 mb-1 text-white">
                  {g.title}
                </h3>
                <p className="text-sm text-white/80">{g.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
