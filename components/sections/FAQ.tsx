'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faq } from '@/content/faq';

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="font-serif text-primary text-3xl sm:text-4xl mb-10"
        >
          Частые вопросы
        </h2>

        {/* base-ui Accordion: multiple={false} = single-open (default) */}
        <Accordion defaultValue={[]} className="flex flex-col gap-2">
          {faq.map(item => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border rounded-[12px] px-5 py-1 data-open:shadow-[0_2px_12px_0_rgba(30,58,95,0.08)]"
            >
              <AccordionTrigger className="text-base font-semibold text-primary text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-muted leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
