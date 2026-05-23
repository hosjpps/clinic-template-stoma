'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { clinic } from '@/content/clinic';

export default function MobileStickyCTA() {
  const phone = clinic.phones[0];

  return (
    <div
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex h-14 bg-white border-t border-border shadow-[0_-2px_12px_rgba(30,58,95,0.10)]"
      aria-label="Быстрые действия"
    >
      <a
        href={`tel:${phone.value}`}
        className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold text-primary border-r border-border hover:bg-bg-soft transition-colors"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Позвонить
      </a>
      <a
        href={`https://wa.me/${phone.value.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold text-primary hover:bg-bg-soft transition-colors"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
