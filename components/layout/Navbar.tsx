'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { clinic } from '@/content/clinic';
import BookingDialog from '@/components/forms/BookingDialog';

const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'Врачи', href: '#doctors' },
  { label: 'Цены', href: '#prices' },
  { label: 'Прайс-лист', href: '/uslugi/' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = clinic.phones[0];

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_2px_12px_0_rgba(30,58,95,0.08)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Основная навигация"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="text-primary"
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
          <span className="flex flex-col leading-none">
            <span className="font-bold text-lg text-primary tracking-tight">{clinic.name}</span>
            <span className="text-[10px] text-text-muted uppercase tracking-widest">стоматология</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-primary/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${phone.value}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone.display}
          </a>
          <BookingDialog triggerLabel="Записаться" />
        </div>

        {/* Mobile burger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-bg-soft"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5 text-primary" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col pt-10 gap-6 w-72">
            <SheetTitle className="sr-only">Навигация</SheetTitle>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="font-bold text-xl text-primary">{clinic.name}</span>
              <span className="text-xs text-text-muted uppercase tracking-widest">стоматология</span>
            </Link>
            <ul className="flex flex-col gap-4" role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-primary hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href={`tel:${phone.value}`}
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Phone className="h-4 w-4" />
                {phone.display}
              </a>
              <BookingDialog
                triggerLabel="Записаться"
                triggerClassName="w-full"
              />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
