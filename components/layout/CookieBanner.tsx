'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'clinic_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === '1') return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-banner"
      // bottom-14 on mobile so the banner sits above MobileStickyCTA (h-14); sm:bottom-0 on wider screens
      className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_12px_rgba(30,58,95,0.08)] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm text-text-muted">
        Сайт использует cookies для улучшения работы. Продолжая, вы соглашаетесь с{' '}
        <Link
          href="/politika-konfidencialnosti/"
          className="underline underline-offset-2 hover:text-primary transition-colors"
        >
          политикой конфиденциальности
        </Link>
        .
      </p>
      <Button
        size="sm"
        data-testid="cookie-banner-accept"
        onClick={accept}
        className="shrink-0"
      >
        Понятно
      </Button>
    </div>
  );
}
