import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Feather, Sparkles } from 'lucide-react';
import { ContentItem } from '../types';
import { CONTENT_ITEMS } from '../data/content';
import { POPULAR_SEARCH_TERMS } from '../data/navigation';
import { ShayariCard } from './ShayariCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShare: (item: ContentItem) => void;
  onSelectCategory: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onOpenShare,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'shayari' | 'poetry' | 'quote' | 'status'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    return CONTENT_ITEMS.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }
      if (!cleanQ) return true;

      const matchesText = item.text.toLowerCase().includes(cleanQ);
      const matchesTitle = item.title.toLowerCase().includes(cleanQ);
      const matchesCategory = item.category.toLowerCase().includes(cleanQ);
      const matchesTags = item.tags.some(t => t.toLowerCase().includes(cleanQ));

      return matchesText || matchesTitle || matchesCategory || matchesTags;
    });
  }, [query, typeFilter]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Search Panel"
    >
      <div 
        className="bg-[#FAF7F2] dark:bg-[#1A1513] border border-[#E3D7C8] dark:border-[#382E26] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden mt-6"
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#EAE0D3] dark:border-[#2D241E] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Shayari, Poetry, Quotes..."
            className="flex-1 bg-transparent text-base sm:text-lg text-[#261E19] dark:text-[#F3ECE4] placeholder-[#8A7D72] dark:placeholder-[#9C8F84] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#8A7D72] hover:text-[#261E19] dark:hover:text-[#F3ECE4]"
              aria-label="Clear query"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#D5C4B0] dark:border-[#42372D] text-[#695D53] dark:text-[#B6ACA2] hover:bg-[#F3EBE0] dark:hover:bg-[#28211B]"
          >
            ESC
          </button>
        </div>

        {/* Popular Searches Chips */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F4EDE2]/80 dark:bg-[#1C1714] border-b border-[#EAE0D3] dark:border-[#2D241E] flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="shrink-0 text-[#8D6527] dark:text-[#D4AF37] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Popular:
          </span>
          {POPULAR_SEARCH_TERMS.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="shrink-0 py-1 px-2.5 rounded-lg bg-white dark:bg-[#251E19] border border-[#DED0BF] dark:border-[#382E25] text-[#4A3D34] dark:text-[#C5BCB3] hover:border-[#8D6527] dark:hover:border-[#D4AF37] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Filter Controls (Segmented Tabs) */}
        <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2] dark:bg-[#1E1916] border-b border-[#EAE0D3] dark:border-[#2D241E] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-[#EAE0D3] dark:bg-[#161210] rounded-xl text-xs">
            {(['all', 'shayari', 'poetry', 'quote', 'status'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors font-medium ${
                  typeFilter === type
                    ? 'bg-white dark:bg-[#2A231E] text-[#8D6527] dark:text-[#D4AF37] shadow-xs'
                    : 'text-[#695D53] dark:text-[#A89D92] hover:text-[#261E19]'
                }`}
              >
                {type === 'all' ? 'All Alfaaz' : type}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#7B6E63] dark:text-[#A89D92]">
            {filteredResults.length} {filteredResults.length === 1 ? 'verse' : 'verses'} found
          </div>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredResults.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EFE7DC] dark:bg-[#2A221C] mx-auto flex items-center justify-center text-[#8D6527] dark:text-[#D4AF37] mb-3">
                <Feather className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#2A201A] dark:text-[#F3ECE4] mb-1">
                कोई अल्फ़ाज़ नहीं मिले • No verses found
              </h4>
              <p className="text-sm text-[#7B6E63] dark:text-[#A89D92] max-w-sm mx-auto mb-4">
                Try searching for keywords like "dard", "love", "ishq", "khamoshi", "friendship", or "silence".
              </p>
              <button
                onClick={() => setQuery('')}
                className="py-1.5 px-3.5 rounded-xl border border-[#D5C2AD] dark:border-[#3E3126] text-xs font-semibold hover:bg-[#F3EBE0] dark:hover:bg-[#261E19]"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((item, idx) => (
                <ShayariCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onOpenShare={onOpenShare}
                  onSelectCategory={(slug) => {
                    onSelectCategory(slug);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
