import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  titleHi?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
  titleHi = "अक्सर पूछे जाने वाले सवाल",
  subtitle = "Questions about our Hindi Shayari, poetry rights, saving, and sharing."
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <section id="faq-section" className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>{titleHi}</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#2A201A] dark:text-[#F3ECE4]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const contentId = `faq-content-${idx}`;
          const buttonId = `faq-btn-${idx}`;

          return (
            <div
              key={idx}
              className="rounded-xl border border-[#E4D7C7] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#1E1916] overflow-hidden transition-colors"
            >
              <button
                id={buttonId}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-[#F4ECE0]/50 dark:hover:bg-[#251E19] transition-colors focus-visible:outline-none"
              >
                <span className="font-serif text-base sm:text-lg font-semibold text-[#281F1A] dark:text-[#F3ECE4]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8D6527] dark:text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 sm:px-5 pb-5 text-sm text-[#5C5046] dark:text-[#C5BCB3] leading-relaxed border-t border-[#EFE5D7] dark:border-[#2A221B] pt-3"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
