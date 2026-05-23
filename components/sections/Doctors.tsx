'use client';

import { useState } from 'react';
import { doctors } from '@/content/doctors';

export default function Doctors() {
  const [errored, setErrored] = useState<Record<string, boolean>>({});

  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="py-16 bg-bg-soft"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="doctors-heading"
          className="font-serif text-primary text-3xl lg:text-4xl mb-2"
        >
          Наши специалисты
        </h2>
        <p className="text-text-muted mb-10">
          Опытные врачи высшей категории
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map(doc => (
            <article
              key={doc.id}
              className="bg-white rounded-[16px] overflow-hidden hover:shadow-[0_8px_32px_0_rgba(30,58,95,0.12)] transition-shadow"
            >
              {!doc.photo || errored[doc.id] ? (
                <div
                  className="aspect-[3/4] bg-accent-soft flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-5xl font-serif font-bold text-primary">
                    {doc.initials}
                  </span>
                </div>
              ) : (
                <img
                  src={doc.photo}
                  alt={`${doc.name}, ${doc.position}`}
                  className="aspect-[3/4] w-full object-cover bg-white"
                  loading="lazy"
                  onError={() => setErrored(prev => ({ ...prev, [doc.id]: true }))}
                />
              )}
              <div className="p-4">
                <span className="inline-block bg-accent-soft text-primary px-2 py-0.5 text-xs rounded">
                  {doc.position}
                </span>
                <h3 className="text-base font-semibold text-primary mt-2">
                  {doc.name}
                </h3>
                <p className="text-sm text-text-muted">{doc.specialization}</p>
                <p className="text-xs text-text-muted mt-1">
                  {doc.education}
                  {doc.experience ? ` · Стаж: ${doc.experience}` : ''}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
