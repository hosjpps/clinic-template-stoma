import {
  Sparkles,
  Smile,
  Stethoscope,
  Scissors,
  Crown,
  Baby,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { services } from '@/content/services';

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Smile,
  Stethoscope,
  Scissors,
  Crown,
  Baby,
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="services-heading"
          className="font-serif text-primary text-3xl lg:text-4xl mb-2"
        >
          Наши услуги
        </h2>
        <p className="text-text-muted mb-10">
          Полный спектр стоматологических услуг для взрослых и детей
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => {
            const Icon: LucideIcon = ICONS[s.icon] ?? Sparkles;
            return (
              <Card
                key={s.id}
                className="bg-white border border-border rounded-[16px] p-6 hover:shadow-[0_4px_12px_rgba(30,58,95,0.08)] transition-shadow"
              >
                <CardHeader className="p-0 pb-2">
                  <div className="bg-accent-soft w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mt-4 mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm mb-3">{s.description}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="text-xs text-text-muted space-y-1 mt-2" role="list">
                    {s.items.map(item => (
                      <li key={item} className="flex gap-1">
                        <span aria-hidden="true">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={s.href}
                    className="inline-block mt-4 text-accent text-sm font-medium hover:text-primary transition-colors"
                  >
                    Подробнее →
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
