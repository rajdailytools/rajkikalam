import React from 'react';
import { BookOpen } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/content';
import { ContentItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShayariCard } from '../components/ShayariCard';
import { NewsletterBox } from '../components/NewsletterBox';

interface PoemsPageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const PoemsPage: React.FC<PoemsPageProps> = ({ onNavigate, onOpenShare }) => {
  const hindiPoems = CONTENT_ITEMS.filter(i => i.type === 'shayari' && i.language === 'hi').slice(0, 4);
  const englishPoems = CONTENT_ITEMS.filter(i => i.type === 'poetry' && i.language === 'en').slice(0, 4);
  const shortPoems = CONTENT_ITEMS.filter(i => i.categorySlug === 'short-poems');
  const lovePoems = CONTENT_ITEMS.filter(i => i.mood === 'love' || i.mood === 'romantic').slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Poem Anthology' }
        ]}
        onNavigate={onNavigate}
      />

      <header className="space-y-3 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>ANTHOLOGY OF VERSE</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
          Poems & Poetry Collection • नज़्म व कविता संग्रह
        </h1>

        <p className="text-base text-[#615347] dark:text-[#B6ACA2] max-w-2xl">
          An artistic curation of Hindi poems, English verses, short epigrams, and upcoming original creations by Raj Ki Kalam.
        </p>
      </header>

      {/* English Poems Section */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            English Poems & Verses
          </h2>
          <button
            onClick={() => onNavigate('/english-poetry/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            All English Poetry →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {englishPoems.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* Hindi Poems / Shayari Section */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            हिंदी नज़्में व कविताएं (Hindi Verses)
          </h2>
          <button
            onClick={() => onNavigate('/hindi-shayari/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            All Hindi Shayari →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hindiPoems.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* Short Epigrams */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Short Poems & Micro-Poetry
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shortPoems.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* Love Poems Section */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Love & Romance Poems
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lovePoems.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
};
