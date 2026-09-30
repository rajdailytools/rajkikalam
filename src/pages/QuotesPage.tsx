import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/content';
import { ContentItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShayariCard } from '../components/ShayariCard';
import { NewsletterBox } from '../components/NewsletterBox';

interface QuotesPageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const QuotesPage: React.FC<QuotesPageProps> = ({ onNavigate, onOpenShare }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allQuotes = CONTENT_ITEMS.filter((i) => i.type === 'quote');

  const filteredQuotes = selectedCategory === 'all'
    ? allQuotes
    : allQuotes.filter((i) => i.categorySlug === selectedCategory);

  const categories = [
    { slug: 'all', label: 'All Quotes', labelHi: 'सभी विचार' },
    { slug: 'life-quotes', label: 'Life', labelHi: 'जीवन' },
    { slug: 'love-quotes', label: 'Love', labelHi: 'प्रेम' },
    { slug: 'motivational-quotes', label: 'Motivation', labelHi: 'प्रेरणा' },
    { slug: 'sad-quotes', label: 'Sad', labelHi: 'उदासी' },
    { slug: 'friendship-quotes', label: 'Friendship', labelHi: 'दोस्ती' },
    { slug: 'relationship-quotes', label: 'Relationship', labelHi: 'रिश्ते' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Quotes & Thoughts' }
        ]}
        onNavigate={onNavigate}
      />

      <header className="space-y-3 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
          <Quote className="w-4 h-4" />
          <span>LITERARY THOUGHTS & ANTHOLOGY</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
          Quotes & Thoughts • अनमोल विचार व सुविचार
        </h1>

        <p className="text-base text-[#615347] dark:text-[#B6ACA2] max-w-2xl">
          Soulful proverbs and deep literary reflections on love, solitude, resilience, and relationships in Hindi & English.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-[#8D6527] text-white shadow-xs'
                : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3] hover:bg-[#EAE1D3] dark:hover:bg-[#302720]'
            }`}
          >
            {cat.label} ({cat.labelHi})
          </button>
        ))}
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuotes.map((item, idx) => (
          <ShayariCard
            key={item.id}
            item={item}
            index={idx}
            onOpenShare={onOpenShare}
            onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
          />
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
};
