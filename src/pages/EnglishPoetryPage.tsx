import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ContentItem } from '../types';
import { CONTENT_ITEMS, FAQS } from '../data/content';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TableOfContents } from '../components/TableOfContents';
import { FeaturedShayari } from '../components/FeaturedShayari';
import { ShayariCard } from '../components/ShayariCard';
import { PoetryImageCard } from '../components/PoetryImageCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { NewsletterBox } from '../components/NewsletterBox';

interface EnglishPoetryPageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const EnglishPoetryPage: React.FC<EnglishPoetryPageProps> = ({ onNavigate, onOpenShare }) => {
  const [activeSection, setActiveSection] = useState<string>('featured-poetry');

  const englishPoems = CONTENT_ITEMS.filter((i) => i.type === 'poetry');
  const heartbreakPoems = englishPoems.filter((i) => i.categorySlug === 'heartbreak-poetry');
  const shortPoems = englishPoems.filter((i) => i.categorySlug === 'short-poems');
  const lovePoems = englishPoems.filter((i) => i.categorySlug === 'love-poetry' || i.categorySlug === 'romantic-poems');
  const relatedQuotes = CONTENT_ITEMS.filter((i) => i.type === 'quote').slice(0, 3);
  const featured = englishPoems[0] || CONTENT_ITEMS[0];

  const tocItems = [
    { id: 'featured-poetry', label: 'Featured Editorial Poem' },
    { id: 'short-poems-section', label: 'Short Poems & Epigrams' },
    { id: 'heartbreak-section', label: 'Heartbreak & Grief' },
    { id: 'love-section', label: 'Love & Quiet Devotion' },
    { id: 'visual-cards-section', label: 'Graphic Poetry Cards' },
    { id: 'related-quotes-section', label: 'Philosophical Quotes' },
    { id: 'faq-section', label: 'FAQ' },
  ];

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'English Poetry' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <header className="space-y-4 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8D6527] dark:text-[#D4AF37] font-semibold uppercase tracking-wider">
          <span>LITERARY ANTHOLOGY</span>
          <span aria-hidden="true">·</span>
          <span>CONTEMPORARY ENGLISH VERSE</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE] tracking-tight leading-tight">
          50+ Short Sad Poems & Heartbreak Poetry
        </h1>

        <p className="text-base sm:text-lg text-[#615347] dark:text-[#B6ACA2] leading-relaxed max-w-3xl">
          Soulful modern English poems exploring quiet solitude, heartbreak, timeless love, and the tender art of healing. Written with classical lyricism and modern resonance.
        </p>

        {/* Metadata info: Updated date & read time */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#7B6E63] dark:text-[#A89D92] pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: March 2026</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>4 min read</span>
          </div>
          <span aria-hidden="true">·</span>
          <span className="italic text-[#8D6527] dark:text-[#D4AF37]">
            Curated Demo Anthology
          </span>
        </div>

        {/* Cross-language Link (English -> Hindi) */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/sad-shayari-in-hindi/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            <span>हिंदी में दर्द भरी शायरी पढ़ें (Read Hindi Shayari) →</span>
          </button>
        </div>
      </header>

      {/* Table of Contents */}
      <TableOfContents
        items={tocItems}
        activeId={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Featured Poetry Section */}
      <section id="featured-poetry" className="scroll-mt-24">
        <FeaturedShayari
          item={featured}
          onOpenShare={onOpenShare}
          onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
        />
      </section>

      {/* Short Poems Section */}
      <section id="short-poems-section" className="space-y-6 pt-6 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Short Poems & Epigrams
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Brief stanzas containing boundless contemplation. Perfect for sharing or quiet reflection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Heartbreak Poetry Section */}
      <section id="heartbreak-section" className="space-y-6 pt-8 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Heartbreak & Melancholy
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Poetic anatomy of loss, unmailed letters, and quiet farewells.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heartbreakPoems.map((item, idx) => (
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

      {/* Love Poetry Section */}
      <section id="love-section" className="space-y-6 pt-8 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Love & Quiet Devotion
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Gentle verses celebrating tenderness, dawn conversations, and eternal affection.
          </p>
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

      {/* Graphic Cards Section */}
      <section id="visual-cards-section" className="space-y-6 pt-8 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Downloadable Graphic Poetry Cards
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Save and share these parchment graphics with Raj Ki Kalam's literary signature.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {englishPoems.slice(0, 2).map((item) => (
            <PoetryImageCard
              key={item.id}
              item={item}
              onOpenShare={onOpenShare}
            />
          ))}
        </div>
      </section>

      {/* Related Quotes Section */}
      <section id="related-quotes-section" className="space-y-6 pt-8 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Related Literary Quotes
            </h2>
            <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
              Thoughtful proverbs companion to our English verses.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/quotes/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            All Quotes →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedQuotes.map((item, idx) => (
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

      {/* FAQ */}
      <FAQAccordion
        items={FAQS}
        title="English Poetry FAQs"
        titleHi="पोएट्री अक्सर पूछे जाने वाले सवाल"
        subtitle="Frequently asked questions about reading, sharing, and saving poetry on RajKiKalam.in."
      />

      {/* Newsletter */}
      <NewsletterBox />

    </div>
  );
};
