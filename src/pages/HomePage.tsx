import React from 'react';
import { Feather, ArrowRight, Sparkles, TrendingUp, BookOpen, Quote, MessageSquare, Instagram, Share2, Mail, Clock, Heart } from 'lucide-react';
import { CONTENT_ITEMS, CATEGORIES, BRAND_INFO } from '../data/content';
import { ContentItem } from '../types';
import { ShayariCard } from '../components/ShayariCard';
import { FeaturedShayari } from '../components/FeaturedShayari';
import { NewsletterBox } from '../components/NewsletterBox';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenShare: (item: ContentItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenShare }) => {
  // Trending items
  const trendingItems = CONTENT_ITEMS.filter(i => i.trending).slice(0, 3);

  // Featured Shayari
  const featuredItem = CONTENT_ITEMS.find(i => i.id === 'hs-01') || CONTENT_ITEMS[0];

  // Hindi Shayari collection (6 items)
  const hindiShayariItems = CONTENT_ITEMS.filter(i => i.type === 'shayari').slice(0, 6);

  // English Poetry collection (4 items)
  const englishPoetryItems = CONTENT_ITEMS.filter(i => i.type === 'poetry').slice(0, 4);

  // Quotes collection (4 items)
  const quotesItems = CONTENT_ITEMS.filter(i => i.type === 'quote').slice(0, 4);

  // Poems collection (4 items)
  const poemsItems = CONTENT_ITEMS.filter(i => i.categorySlug.includes('poem')).slice(0, 4);

  // Status & Captions (4 items)
  const statusItems = CONTENT_ITEMS.filter(i => i.type === 'status').slice(0, 4);

  // Latest Posts (4 items)
  const latestPosts = CONTENT_ITEMS.slice(0, 4);

  // 8 Specific Mood Cards for the clean Explore by Mood section
  const HOMEPAGE_MOODS = [
    { icon: '❤️', label: 'Love', labelHi: 'इश्क़', path: '/love-shayari/' },
    { icon: '💔', label: 'Sad', labelHi: 'उदासी', path: '/sad-shayari/' },
    { icon: '🥀', label: 'Dard', labelHi: 'दर्द', path: '/dard-shayari/' },
    { icon: '🌙', label: 'Alone', labelHi: 'तन्हाई', path: '/alone-shayari/' },
    { icon: '✨', label: 'Hope', labelHi: 'उम्मीद', path: '/motivational-quotes/' },
    { icon: '🔥', label: 'Attitude', labelHi: 'तेवर', path: '/attitude-shayari/' },
    { icon: '🌹', label: 'Romantic', labelHi: 'रूमानी', path: '/romantic-shayari/' },
    { icon: '👫', label: 'Friendship', labelHi: 'दोस्ती', path: '/dosti-shayari/' },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      
      {/* 2. PREMIUM HERO SECTION */}
      <section className="relative pt-4 sm:pt-10 pb-8 sm:pb-14 text-center max-w-4xl mx-auto px-4">
        {/* Literary Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] dark:bg-[#261F19] border border-[#DFCBB5] dark:border-[#3E3228] text-xs font-semibold uppercase tracking-widest text-[#8D6527] dark:text-[#D4AF37]">
          <Feather className="w-3.5 h-3.5" />
          <span>{BRAND_INFO.name} • {BRAND_INFO.tagline}</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#231A15] dark:text-[#FAF5EE] tracking-tight leading-[1.18] mb-5 text-balance">
          अल्फ़ाज़ जो दिल तक पहुँच जाएँ।
          <span className="block mt-2 font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl text-[#785C3A] dark:text-[#D4AF37]">
            Words that echo directly to your soul.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#615347] dark:text-[#B6ACA2] leading-relaxed mb-8">
          Hindi Shayari, English Poetry, Quotes, Poems and heartfelt words. Discover soulful couplets and verses, carefully curated with emotional depth.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('/hindi-shayari/')}
            className="flex items-center gap-2 py-3 px-6 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-sm font-semibold transition-all shadow-xs hover:shadow-md"
          >
            <span>Explore Shayari</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/english-poetry/')}
            className="flex items-center gap-2 py-3 px-6 rounded-xl border border-[#D5C2AD] dark:border-[#3E3126] bg-[#FAF7F2] dark:bg-[#201A16] hover:bg-[#EFE8DD] dark:hover:bg-[#2A221C] text-sm font-semibold text-[#281F1A] dark:text-[#F3ECE4] transition-colors"
          >
            <span>Explore Poetry</span>
          </button>
        </div>

        {/* Author subtle kicker */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#7B6E63] dark:text-[#A89D92]">
          <span>Author & Curator:</span>
          <span className="font-semibold text-[#281F1A] dark:text-[#F3ECE4]">{BRAND_INFO.author}</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND_INFO.domain}</span>
        </div>
      </section>

      {/* 3. TRENDING TODAY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37]" />
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Trending Today • आज के लोकप्रिय अल्फ़ाज़
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/hindi-shayari/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>View All Trending →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingItems.map((item, idx) => (
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

      {/* 4. HINDI SHAYARI */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] block mb-1">
              CLASSICAL & CONTEMPORARY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Hindi Shayari • हिंदी शायरी
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/hindi-shayari/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All Hindi Shayari →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hindiShayariItems.map((item, idx) => (
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

      {/* 5. ENGLISH POETRY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] block mb-1">
              SOULFUL ANTHOLOGY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              English Poetry • Verses of the Heart
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/english-poetry/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All English Poetry →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {englishPoetryItems.map((item, idx) => (
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

      {/* 6. RAJ KI KALAM ORIGINALS */}
      <section className="rounded-3xl bg-[#F7EFE4] dark:bg-[#1E1815] border border-[#DECBB8] dark:border-[#382D22] p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGINAL CREATIVE SANCTUARY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4] mb-2">
            Raj Ki Kalam Originals • मौलिक रचनाएं
          </h2>
          <p className="text-xs text-[#6F6156] dark:text-[#A89D92] leading-relaxed">
            Reserved exclusively for original writings by author <strong className="text-[#281F1A] dark:text-[#F3ECE4]">{BRAND_INFO.author}</strong>. The demo cards below preview the editorial presentation until original compositions are published.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#251E19] border border-[#DECBB8] dark:border-[#382D22] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#8D6527] dark:text-[#D4AF37] block mb-1">
                ORIGINAL SHAYARI
              </span>
              <h4 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-2">
                खामोश रात के नगमे
              </h4>
              <p className="font-hindi-poetry text-xs text-[#55463C] dark:text-[#C5BCB3] line-clamp-3">
                रात जब करवट बदलती है तो यादें जागती हैं...
              </p>
            </div>
            <span className="mt-4 text-[10px] text-[#8C7E72] dark:text-[#9A8D81] italic">
              (Sample demo card • Coming soon)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#251E19] border border-[#DECBB8] dark:border-[#382D22] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#8D6527] dark:text-[#D4AF37] block mb-1">
                ORIGINAL POETRY
              </span>
              <h4 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-2">
                Echoes in the Rain
              </h4>
              <p className="font-serif text-xs italic text-[#55463C] dark:text-[#C5BCB3] line-clamp-3">
                The sky weeps without apology, washing away the dust of yesterday...
              </p>
            </div>
            <span className="mt-4 text-[10px] text-[#8C7E72] dark:text-[#9A8D81] italic">
              (Sample demo card • Coming soon)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#251E19] border border-[#DECBB8] dark:border-[#382D22] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#8D6527] dark:text-[#D4AF37] block mb-1">
                ORIGINAL THOUGHTS
              </span>
              <h4 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-2">
                सफ़र और सब्र
              </h4>
              <p className="font-hindi-poetry text-xs text-[#55463C] dark:text-[#C5BCB3] line-clamp-3">
                रास्तों की थकान तब मिटती है जब मंज़िल खुद गले लगाती है...
              </p>
            </div>
            <span className="mt-4 text-[10px] text-[#8C7E72] dark:text-[#9A8D81] italic">
              (Sample demo card • Coming soon)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#251E19] border border-[#DECBB8] dark:border-[#382D22] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#8D6527] dark:text-[#D4AF37] block mb-1">
                ORIGINAL POEMS
              </span>
              <h4 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-2">
                रूह का दायरा
              </h4>
              <p className="font-hindi-poetry text-xs text-[#55463C] dark:text-[#C5BCB3] line-clamp-3">
                जिस्मों की सरहदों से परे एक दुनिया है जहाँ सिर्फ अहसास रहते हैं...
              </p>
            </div>
            <span className="mt-4 text-[10px] text-[#8C7E72] dark:text-[#9A8D81] italic">
              (Sample demo card • Coming soon)
            </span>
          </div>
        </div>
      </section>

      {/* 7. QUOTES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37]" />
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Quotes & Reflections • अनमोल विचार
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/quotes/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            Explore All Quotes →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotesItems.map((item, idx) => (
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

      {/* 8. POEMS ANTHOLOGY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37]" />
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Poems • नज़्म व कविता संग्रह
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/poems/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            Explore All Poems →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {poemsItems.map((item, idx) => (
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

      {/* 9. STATUS & CAPTIONS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37]" />
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Status & Captions • स्टेटस व कैप्शन
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/status/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            Explore All Status →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statusItems.map((item, idx) => (
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

      {/* EDITORIAL FEATURED SHAYARI CARD */}
      <section>
        <FeaturedShayari
          item={featuredItem}
          onOpenShare={onOpenShare}
          onSelectCategory={(slug) => onNavigate(`/${slug}/`)}
        />
      </section>

      {/* 10. EXPLORE BY MOOD (CLEAN 8-CARD SECTION AS SPECIFIED) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Explore by Mood • मिज़ाज के अनुसार
            </h2>
            <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
              Select what resonates with your heart today.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/categories/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Categories →</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HOMEPAGE_MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => onNavigate(m.path)}
              className="p-5 rounded-2xl bg-white dark:bg-[#1E1916] border border-[#DECDBB] dark:border-[#382E25] hover:border-[#8D6527] dark:hover:border-[#D4AF37] hover:bg-[#F3EBE0] dark:hover:bg-[#251F1A] transition-all text-left flex flex-col justify-between group shadow-2xs"
            >
              <div className="text-3xl mb-3">{m.icon}</div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] group-hover:text-[#8D6527] dark:group-hover:text-[#D4AF37] transition-colors">
                  {m.label}
                </h3>
                <span className="text-xs text-[#8D6527] dark:text-[#D4AF37] font-medium block">
                  {m.labelHi}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/categories/')}
            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl border border-[#D5C2AD] dark:border-[#3E3126] text-xs font-semibold text-[#281F1A] dark:text-[#F3ECE4] hover:bg-[#F3EBE0] dark:hover:bg-[#261F1A] transition-colors"
          >
            <span>View All Categories & Topics Directory →</span>
          </button>
        </div>
      </section>

      {/* 11. LATEST POSTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DACB] dark:border-[#2E241E]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] block mb-1">
              FRESHLY PUBLISHED
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Latest Posts • नवीनतम रचनाएं
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories/')}
            className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
          >
            All Archives →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestPosts.map((post) => (
            <article 
              key={post.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#1E1916] border border-[#E9E0D4] dark:border-[#332A23] flex flex-col justify-between hover:border-[#8D6527] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#7B6E63] dark:text-[#A89D92] mb-2">
                  <span className="text-[#8D6527] dark:text-[#D4AF37] font-medium">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-2 group-hover:text-[#8D6527] dark:group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#55463C] dark:text-[#C5BCB3] line-clamp-2 leading-relaxed">
                  {post.text}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E8DD] dark:border-[#2C241E] flex items-center justify-between">
                <span className="text-[10px] text-[#8C7E72] dark:text-[#9A8D81]">
                  {post.date}
                </span>
                <button
                  onClick={() => onNavigate(`/${post.categorySlug}/`)}
                  className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] flex items-center gap-1 hover:underline"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 12. NEWSLETTER */}
      <NewsletterBox />

      {/* 13. SOCIAL COMMUNITY & FOLLOW SECTION */}
      <section className="rounded-3xl bg-[#FAF3E8]/80 dark:bg-[#1F1916] border border-[#DECBB8] dark:border-[#382D24] p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8D6527] dark:text-[#D4AF37] block mb-2">
            JOIN OUR LITERARY CIRCLE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#281F1A] dark:text-[#F3ECE4] mb-3">
            Connect with Raj Ki Kalam
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5E53] dark:text-[#B6ACA2] leading-relaxed mb-6">
            Stay in touch with daily couplets, poetry postcards, quotes and upcoming announcements. Follow our official literary channels.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4]">
              <Instagram className="w-4 h-4 text-[#C13584]" />
              <span>Instagram</span>
            </span>

            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4]">
              <Share2 className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Channel</span>
            </span>

            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4]">
              <span className="font-bold text-sm">𝕏</span>
              <span>X (Twitter)</span>
            </span>

            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4]">
              <span className="font-bold text-sm text-[#BD081C]">P</span>
              <span>Pinterest</span>
            </span>

            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4]">
              <span className="font-bold text-sm text-[#FF0000]">▶</span>
              <span>YouTube</span>
            </span>

            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{BRAND_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
