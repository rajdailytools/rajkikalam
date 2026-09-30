import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbCrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.path ? `https://rajkikalam.in${crumb.path}` : undefined
    }))
  };

  return (
    <nav aria-label="Breadcrumbs" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#7B6E63] dark:text-[#A89D92]">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3 h-3 text-[#A89D92] dark:text-[#6A5E53]" />}
              {crumb.path && !isLast ? (
                <button
                  onClick={() => onNavigate(crumb.path!)}
                  className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors focus-visible:outline-none"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="font-semibold text-[#281F1A] dark:text-[#F3ECE4]" aria-current={isLast ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
