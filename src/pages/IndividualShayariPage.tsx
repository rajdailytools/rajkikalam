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

interface IndividualShayariPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

interface CategoryMetaConfig {
  title: string;
  subtitle: string;
  intro: string;
  h1: string;
  englishCompanionLink: string;
  englishCompanionLabel: string;
  categoryName: string;
  categoryNameHi: string;
  parentPath: string;
  parentLabel: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryMetaConfig> = {
  'sad-shayari': {
    categoryName: 'Sad Shayari',
    categoryNameHi: 'दर्द व उदासी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Sad Shayari in Hindi • दर्द भरी उदास शायरी',
    title: 'Sad Shayari in Hindi',
    subtitle: 'Heart Touching Sad Shayari, Dard Bhari Shayari & 2 Line Couplets',
    intro: 'दिल की खामोशी और तन्हाई को बयां करने वाली चुनिंदा दर्द भरी शायरी। अल्फ़ाज़ जो आंसुओं को सुकून और दिल को हौसला देते हैं।',
    englishCompanionLink: '/sad-poetry/',
    englishCompanionLabel: 'Read Sad & Heartbreak Poetry in English →'
  },
  'love-shayari': {
    categoryName: 'Love Shayari',
    categoryNameHi: 'इश्क़ व मोहब्बत',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Love Shayari in Hindi • इश्क़ और मोहब्बत शायरी',
    title: 'Love Shayari in Hindi',
    subtitle: 'Romantic Hindi Shayari, Pyar Bhari Shayari & Dil Se Dil Tak Verses',
    intro: 'सच्ची मोहब्बत, रूहानी जुड़ाव और इकरार के मीठे अहसासों को लफ़्ज़ों में पिरोती दिलकश रोमांटिक शायरी।',
    englishCompanionLink: '/love-poetry/',
    englishCompanionLabel: 'Read Love Poetry in English →'
  },
  '2-line-shayari': {
    categoryName: '2 Line Shayari',
    categoryNameHi: 'दो लाइन शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ 2 Line Shayari in Hindi • दो लाइन शायरी',
    title: '2 Line Shayari in Hindi',
    subtitle: 'Deep, Crisp Two-Line Couplets for WhatsApp Status & Instagram Captions',
    intro: 'कम लफ़्ज़ों में समंदर जैसी गहराई रखने वाली चुनिंदा दो लाइन शायरी। स्टेटस और कैप्शन के लिए सबसे बेहतरीन संग्रह।',
    englishCompanionLink: '/short-poems/',
    englishCompanionLabel: 'Read Short Poems & Epigrams in English →'
  },
  'dard-shayari': {
    categoryName: 'Dard Shayari',
    categoryNameHi: 'दर्द शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Dard Shayari in Hindi • गहरा दर्द व तन्हाई शायरी',
    title: 'Dard Shayari in Hindi',
    subtitle: 'Soulful Verses on Heartache, Quiet Tears & Separation',
    intro: 'जब दर्द लफ़्ज़ों की सरहदों को पार कर जाए तो ये अशआर दिल का बोझ हल्का करते हैं। खामोश रात की सिसकियों को आवाज देती शायरी।',
    englishCompanionLink: '/heartbreak-poetry/',
    englishCompanionLabel: 'Read Heartbreak Poetry in English →'
  },
  'attitude-shayari': {
    categoryName: 'Attitude Shayari',
    categoryNameHi: 'तेवर शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Attitude Shayari in Hindi • रॉयल तेवर व अंदाज़ शायरी',
    title: 'Attitude Shayari in Hindi',
    subtitle: 'Self-Respect, Bold Persona & Royal Swag Couplets in Hindi',
    intro: 'स्वाभिमान, बेबाक किरदार और बुलंदी को बयां करती रॉयल ऐटिट्यूड शायरी। अपनी शर्तों पर जीने वालों के लिए खास अशआर।',
    englishCompanionLink: '/motivational-quotes/',
    englishCompanionLabel: 'Read Motivational Quotes in English →'
  },
  'dosti-shayari': {
    categoryName: 'Dosti Shayari',
    categoryNameHi: 'दोस्ती शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Dosti Shayari in Hindi • सच्ची दोस्ती व यारी शायरी',
    title: 'Dosti Shayari in Hindi',
    subtitle: 'Heartwarming Verses on Loyal Friends, Chai & Lifelong Brotherhood',
    intro: 'सच्चे दोस्तों की वफ़ा और बेमतलब की यारी को समर्पित रूहानी शेर। जो हर मोड़ पर साथ निभाने का हौसला देते हैं।',
    englishCompanionLink: '/friendship-quotes/',
    englishCompanionLabel: 'Read Friendship Quotes in English →'
  },
  'romantic-shayari': {
    categoryName: 'Romantic Shayari',
    categoryNameHi: 'रोमांटिक शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Romantic Shayari in Hindi • रूमानी शायरी',
    title: 'Romantic Shayari in Hindi',
    subtitle: 'Sweet Glances, Moonlit Whispers & Romantic Stanzas',
    intro: 'चाँदनी रात में कही गई मीठी बातें और पहली मोहब्बत के नशीले अहसास समेटे रूमानी शायरी।',
    englishCompanionLink: '/romantic-poetry/',
    englishCompanionLabel: 'Read Romantic Poetry in English →'
  },
  'breakup-shayari': {
    categoryName: 'Breakup Shayari',
    categoryNameHi: 'जुदाई शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Breakup Shayari in Hindi • दिल टूटने व जुदाई की शायरी',
    title: 'Breakup Shayari in Hindi',
    subtitle: 'Parting Paths, Broken Promises & Healing in Silence',
    intro: 'अलविदा के दर्द और रिश्तों के बिछड़ने की टीस को बयां करती मार्मिक शायरी।',
    englishCompanionLink: '/heartbreak-poetry/',
    englishCompanionLabel: 'Read Heartbreak Poetry in English →'
  },
  'alone-shayari': {
    categoryName: 'Alone Shayari',
    categoryNameHi: 'तन्हाई शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Alone Shayari in Hindi • अकेलेपन व तन्हाई की शायरी',
    title: 'Alone Shayari in Hindi',
    subtitle: 'Midnight Contemplation, Solitude & Unspoken Reflections',
    intro: 'रात के सन्नाटे में जब सिर्फ अपनी ही सांसों की आवाज़ सुनाई दे, तब यह तन्हाई शायरी हमसफ़र बनती है।',
    englishCompanionLink: '/sad-poetry/',
    englishCompanionLabel: 'Read Solitude Poetry in English →'
  },
  'bewafa-shayari': {
    categoryName: 'Bewafa Shayari',
    categoryNameHi: 'बेवफ़ा शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Bewafa Shayari in Hindi • बेवफ़ाई व टूटे वादे शायरी',
    title: 'Bewafa Shayari in Hindi',
    subtitle: 'Betrayal, Broken Trust & Moving Forward with Dignity',
    intro: 'झूठे वादों और बेरुखी के ज़ख्मों को लफ़्ज़ों में बयां करती चुनिंदा शायरी।',
    englishCompanionLink: '/heartbreak-poetry/',
    englishCompanionLabel: 'Read Heartbreak Poetry in English →'
  },
  'heart-touching-shayari': {
    categoryName: 'Heart Touching Shayari',
    categoryNameHi: 'दिल छूने वाली शायरी',
    parentPath: '/hindi-shayari/',
    parentLabel: 'Hindi Shayari',
    h1: '100+ Heart Touching Shayari in Hindi • दिल को छू लेने वाले अल्फ़ाज़',
    title: 'Heart Touching Shayari',
    subtitle: 'Deeply Moving Verses on Life, Love & Quiet Solitude',
    intro: 'वो शेर जो सीधे रूह में उतर जाएं और दिल के तारों को हौले से छू लें।',
    englishCompanionLink: '/short-poems/',
    englishCompanionLabel: 'Read Short Poems in English →'
  },
};

export const IndividualShayariPage: React.FC<IndividualShayariPageProps> = ({
  categorySlug,
  onNavigate,
  onOpenShare
}) => {
  // Normalize slug without trailing/leading slashes or "-in-hindi"
  const cleanSlug = categorySlug.replace(/^\/|\/$/g, '').replace('-in-hindi', '');
  const config = CATEGORY_CONFIGS[cleanSlug] || CATEGORY_CONFIGS['sad-shayari'];

  const [activeSection, setActiveSection] = useState<string>('featured-section');

  // Filter items matching this category or tag
  const matchingItems = CONTENT_ITEMS.filter((item) => {
    return (
      item.categorySlug.includes(cleanSlug) ||
      item.tags.some(t => t.includes(cleanSlug) || cleanSlug.includes(t)) ||
      item.type === 'shayari'
    );
  });

  const featured = matchingItems[0] || CONTENT_ITEMS[0];
  const latestShayari = matchingItems.slice(0, 3);
  const popularShayari = matchingItems.slice(3, 6);
  const twoLineShayari = CONTENT_ITEMS.filter(i => i.categorySlug === '2-line-shayari').slice(0, 3);
  const heartTouching = matchingItems.slice(6, 9);
  const imageCards = matchingItems.slice(0, 2);

  const tocItems = [
    { id: 'featured-section', label: 'Featured Shayari' },
    { id: 'latest-section', label: 'Latest Shayari' },
    { id: 'popular-section', label: 'Popular Couplets' },
    { id: 'two-line-section', label: '2 Line Shayari' },
    { id: 'heart-touching-section', label: 'Heart Touching' },
    { id: 'images-section', label: 'Shayari Images' },
    { id: 'faq-section', label: 'Frequently Asked Questions' },
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
      
      {/* Breadcrumb Navigation: Home → Section → Category */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: config.parentLabel, path: config.parentPath },
          { label: config.categoryName }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <header className="space-y-4 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8D6527] dark:text-[#D4AF37] font-semibold uppercase tracking-wider">
          <span>{config.parentLabel.toUpperCase()} COLLECTION</span>
          <span aria-hidden="true">·</span>
          <span>{config.categoryNameHi}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE] tracking-tight leading-tight">
          {config.h1}
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[#785C3A] dark:text-[#D4AF37]">
          {config.subtitle}
        </p>

        <p className="text-sm sm:text-base text-[#615347] dark:text-[#B6ACA2] leading-relaxed max-w-3xl">
          {config.intro}
        </p>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#7B6E63] dark:text-[#A89D92] pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: March 2026</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>5 min read</span>
          </div>
          <span aria-hidden="true">·</span>
          <span className="italic text-[#8D6527] dark:text-[#D4AF37]">
            Demo collection (मूल रचनाएँ जल्द प्रकाशित होंगी)
          </span>
        </div>

        {/* Cross-language Link */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate(config.englishCompanionLink)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            <span>{config.englishCompanionLabel}</span>
          </button>
        </div>
      </header>

      {/* Table of Contents */}
      <TableOfContents
        items={tocItems}
        activeId={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Featured Shayari Showcase Card */}
      <section id="featured-section" className="scroll-mt-24">
        <FeaturedShayari
          item={featured}
          onOpenShare={onOpenShare}
          onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
        />
      </section>

      {/* Latest Shayari */}
      <section id="latest-section" className="space-y-6 pt-4 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Latest {config.categoryName} • नवीनतम पंक्तियाँ
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Freshly composed stanzas capturing genuine sentiment and tone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestShayari.map((item, idx) => (
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

      {/* Popular Shayari */}
      <section id="popular-section" className="space-y-6 pt-6 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Popular {config.categoryName} • लोकप्रिय अशआर
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularShayari.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx + 3}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* 2 Line Shayari */}
      <section id="two-line-section" className="space-y-6 pt-6 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            2 Line {config.categoryName} • दो लाइन शेर
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Short, impactful couplets crafted for status, bios and reflections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {twoLineShayari.map((item, idx) => (
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

      {/* Heart Touching Shayari */}
      <section id="heart-touching-section" className="space-y-6 pt-6 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Heart Touching Couplets • दिल को छू लेने वाले अल्फ़ाज़
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heartTouching.map((item, idx) => (
            <ShayariCard
              key={item.id}
              item={item}
              index={idx + 6}
              onOpenShare={onOpenShare}
              onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
            />
          ))}
        </div>
      </section>

      {/* Shayari Images for Social */}
      <section id="images-section" className="space-y-6 pt-6 scroll-mt-24">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            {config.categoryName} Images for WhatsApp & Instagram
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Download high-resolution graphic cards ready for your stories and posts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {imageCards.map((item) => (
            <PoetryImageCard
              key={item.id}
              item={item}
              onOpenShare={onOpenShare}
            />
          ))}
        </div>
      </section>

      {/* Related Categories Navigation */}
      <section className="p-8 rounded-3xl bg-[#F7EFE4]/80 dark:bg-[#1C1714] border border-[#DECBB8] dark:border-[#382D24] space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
          Related Categories • संबंधित श्रेणियाँ
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: 'Love Shayari (इश्क़)', path: '/love-shayari/' },
            { label: 'Sad Shayari (दर्द)', path: '/sad-shayari/' },
            { label: '2 Line Shayari (२ लाइन)', path: '/2-line-shayari/' },
            { label: 'Dard Shayari (गहरा दर्द)', path: '/dard-shayari/' },
            { label: 'Attitude Shayari (तेवर)', path: '/attitude-shayari/' },
            { label: 'Dosti Shayari (दोस्ती)', path: '/dosti-shayari/' },
            { label: 'Romantic Shayari (रोमांस)', path: '/romantic-shayari/' },
            { label: 'Alone Shayari (तन्हाई)', path: '/alone-shayari/' },
            { label: 'All Categories Directory', path: '/categories/' },
          ].map((cat) => (
            <button
              key={cat.path}
              onClick={() => onNavigate(cat.path)}
              className="py-2 px-3.5 rounded-xl bg-white dark:bg-[#251E19] border border-[#E0D1BF] dark:border-[#382D25] text-[#342A22] dark:text-[#C5BCB3] hover:border-[#8D6527] dark:hover:border-[#D4AF37] transition-colors"
            >
              {cat.label} →
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <FAQAccordion items={FAQS} />

      {/* Newsletter */}
      <NewsletterBox />

    </div>
  );
};
