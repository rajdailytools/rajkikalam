import React from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  label: string;
  labelHi?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
  onSelectSection: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeId, onSelectSection }) => {
  return (
    <nav 
      aria-label="Table of Contents" 
      className="p-5 rounded-2xl bg-[#F6EFE5] dark:bg-[#1F1916] border border-[#E3D6C5] dark:border-[#332921] mb-8"
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37]">
        <List className="w-4 h-4" />
        <span>विषय सूची • Table of Contents</span>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelectSection(item.id)}
                className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#8D6527] text-white font-medium shadow-2xs'
                    : 'text-[#4A3D34] dark:text-[#C7BFB6] hover:bg-[#EDE3D4] dark:hover:bg-[#2A221C] hover:text-[#211813]'
                }`}
              >
                <span className="font-serif font-bold opacity-60">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span className="truncate">
                  {item.label} {item.labelHi && `(${item.labelHi})`}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
