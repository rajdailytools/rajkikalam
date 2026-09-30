import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/content';
import { ContentItem } from '../types';
import { getFavorites } from '../utils/storage';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShayariCard } from '../components/ShayariCard';

interface SavedPageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ onNavigate, onOpenShare }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'shayari' | 'poetry' | 'quote'>('all');

  const loadFavs = () => {
    setFavoriteIds(getFavorites());
  };

  useEffect(() => {
    loadFavs();
    window.addEventListener('favorites-updated', loadFavs);
    return () => window.removeEventListener('favorites-updated', loadFavs);
  }, []);

  const allSavedItems = CONTENT_ITEMS.filter((item) => favoriteIds.includes(item.id));

  const filteredItems = filterType === 'all'
    ? allSavedItems
    : allSavedItems.filter((item) => item.type === filterType);

  const handleClearAll = () => {
    if (window.confirm('क्या आप सभी सहेजे गए अल्फ़ाज़ हटाना चाहते हैं? (Remove all saved items?)')) {
      localStorage.setItem('rajkikalam_saved_ids', JSON.stringify([]));
      window.dispatchEvent(new Event('favorites-updated'));
    }
  };

  const shayariCount = allSavedItems.filter(i => i.type === 'shayari').length;
  const poetryCount = allSavedItems.filter(i => i.type === 'poetry').length;
  const quoteCount = allSavedItems.filter(i => i.type === 'quote').length;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Saved Words' }
        ]}
        onNavigate={onNavigate}
      />

      <header className="space-y-3 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
            <Heart className="w-4 h-4 text-[#B84030] fill-[#B84030]/20" />
            <span>MY PRIVATE LITERARY ARCHIVE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
            Saved Words • सहेजे गए अल्फ़ाज़
          </h1>

          <p className="text-base text-[#615347] dark:text-[#B6ACA2] max-w-xl">
            Your private favorites collection stored locally in your browser. No sign-up needed.
          </p>
        </div>

        {allSavedItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl border border-[#D5C2AD] dark:border-[#382E26] hover:bg-[#F3EBE0] dark:hover:bg-[#28211B] text-xs font-medium text-[#7B6E63] dark:text-[#A89D92] hover:text-[#B84030] transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved</span>
          </button>
        )}
      </header>

      {/* Filter Tabs when items exist */}
      {allSavedItems.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-[#8D6527] text-white shadow-xs'
                : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3]'
            }`}
          >
            All Saved ({allSavedItems.length})
          </button>

          <button
            onClick={() => setFilterType('shayari')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
              filterType === 'shayari'
                ? 'bg-[#8D6527] text-white shadow-xs'
                : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3]'
            }`}
          >
            Saved Shayari ({shayariCount})
          </button>

          <button
            onClick={() => setFilterType('poetry')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
              filterType === 'poetry'
                ? 'bg-[#8D6527] text-white shadow-xs'
                : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3]'
            }`}
          >
            Saved Poetry ({poetryCount})
          </button>

          <button
            onClick={() => setFilterType('quote')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
              filterType === 'quote'
                ? 'bg-[#8D6527] text-white shadow-xs'
                : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3]'
            }`}
          >
            Saved Quotes ({quoteCount})
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#F7EFE4]/60 dark:bg-[#1C1714]/60 border border-[#DFCBB5] dark:border-[#332921] p-8 max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EFE7DC] dark:bg-[#261F19] mx-auto flex items-center justify-center text-[#B84030] mb-2">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2A201A] dark:text-[#F3ECE4]">
            Your saved words will appear here.
          </h2>
          <p className="text-sm text-[#7B6E63] dark:text-[#A89D92] leading-relaxed">
            Click the heart icon (♡) on any Shayari, poem, quote, or status card to bookmark it for reading or sharing later.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/hindi-shayari/')}
              className="py-3 px-6 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-semibold transition-colors inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Shayari</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
