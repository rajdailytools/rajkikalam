import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/content';
import { ContentItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShayariCard } from '../components/ShayariCard';
import { NewsletterBox } from '../components/NewsletterBox';

interface StatusPageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({ onNavigate, onOpenShare }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allStatus = CONTENT_ITEMS.filter((i) => i.type === 'status');

  const filteredStatus = selectedCategory === 'all'
    ? allStatus
    : allStatus.filter((i) => i.categorySlug === selectedCategory);

  const categories = [
    { slug: 'all', label: 'All Status & Captions', labelHi: 'सभी स्टेटस' },
    { slug: 'whatsapp-status', label: 'WhatsApp Status', labelHi: 'व्हाट्सएप' },
    { slug: 'instagram-captions', label: 'Instagram Captions', labelHi: 'इंस्टाग्राम' },
    { slug: 'facebook-status', label: 'Facebook Status', labelHi: 'फेसबुक' },
    { slug: 'love-status', label: 'Love Status', labelHi: 'प्यार' },
    { slug: 'sad-status', label: 'Sad Status', labelHi: 'उदास' },
    { slug: 'attitude-status', label: 'Attitude Status', labelHi: 'तेवर' },
    { slug: 'short-captions', label: 'Short Captions', labelHi: 'संक्षिप्त' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Status & Captions' }
        ]}
        onNavigate={onNavigate}
      />

      <header className="space-y-3 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>SOCIAL MEDIA & STATUS COLLECTION</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
          Status & Captions • व्हाट्सएप स्टेटस व कैप्शन
        </h1>

        <p className="text-base text-[#615347] dark:text-[#B6ACA2] max-w-2xl">
          Ready-to-copy quotes and status messages for WhatsApp, Instagram posts, and Facebook. Includes literary hashtags and formatted captions.
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStatus.map((item, idx) => (
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
