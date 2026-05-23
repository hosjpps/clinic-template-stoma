import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-8xl font-serif text-accent mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-serif text-primary mb-3">Страница не найдена</h1>
      <p className="text-text-muted mb-8 max-w-sm">
        Возможно, страница была удалена или вы ввели неверный адрес.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3
                     text-white font-medium hover:bg-primary/90 transition-colors
                     focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          На главную
        </Link>
        <a
          href="tel:+70000000000"
          className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3
                     text-primary font-medium hover:bg-primary/5 transition-colors
                     focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Позвонить нам
        </a>
      </div>
    </main>
  );
}
