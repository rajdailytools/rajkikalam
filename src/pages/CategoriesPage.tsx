import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CONTENT_ITEMS, CATEGORIES } from '../data/content';
import { MoodType } from '../types';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

interface MoodCard {
  mood: MoodType;
  icon: string;
  name: string;
  nameHi: string;
  description: string;
  path: string;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const MOOD_CARDS: MoodCard[] = [
    {
      mood: 'love',
      icon: '❤️',
      name: 'Love',
      nameHi: 'इश्क़ व मोहब्बत',
      description: 'Romantic words and heartfelt expressions of affection and devotion.',
      path: '/love-shayari/'
    },
    {
      mood: 'sad',
      icon: '💔',
      name: 'Sad',
      nameHi: 'उदास व तन्हाई',
      description: 'Gentle expressions of melancholy, solitude, and quiet tears.',
      path: '/sad-shayari/'
    },
    {
      mood: 'dard',
      icon: '🥀',
      name: 'Dard',
      nameHi: 'गहरा दर्द',
      description: 'Soulful couplets voicing emotional heartache and unspoken sorrow.',
      path: '/dard-shayari/'
    },
    {
      mood: 'alone',
      icon: '🌙',
      name: 'Alone',
      nameHi: 'तन्हा आलम',
      description: 'Contemplative verses reflecting on quiet midnight solitude.',
      path: '/alone-shayari/'
    },
    {
      mood: 'hope',
      icon: '✨',
      name: 'Hope',
      nameHi: 'उम्मीद व सब्र',
      description: 'Inspiring lines reminding the weary heart of dawn after darkness.',
      path: '/motivational-quotes/'
    },
    {
      mood: 'attitude',
      icon: '🔥',
      name: 'Attitude',
      nameHi: 'तेवर व अंदाज़',
      description: 'Royal couplets reflecting self-respect, pride, and unapologetic character.',
      path: '/attitude-shayari/'
    },
    {
      mood: 'romantic',
      icon: '🌹',
      name: 'Romantic',
      nameHi: 'रूमानी अहसास',
      description: 'Intimate poetry, gentle glances, and sweet confessions under the stars.',
      path: '/romantic-shayari/'
    },
    {
      mood: 'friendship',
      icon: '👫',
      name: 'Friendship',
      nameHi: 'सच्ची दोस्ती',
      description: 'Heartwarming tributes to steadfast camaraderie, tea, and lifelong bonds.',
      path: '/dosti-shayari/'
    },
    {
      mood: 'life',
      icon: '🌿',
      name: 'Life',
      nameHi: 'ज़िंदगी का सच',
      description: 'Philosophical reflections on destiny, patience, and the passage of time.',
      path: '/life-quotes/'
    },
    {
      mood: 'deep',
      icon: '💭',
      name: 'Deep Thoughts',
      nameHi: 'गहरे विचार',
      description: 'Introspective proverbs exploring the subtle complexities of human bonds.',
      path: '/quotes/'
    },
  ];

  const CONTENT_TYPES_DATA = [
    {
      name: 'Hindi Shayari',
      nameHi: 'हिंदी शायरी संग्रह',
      icon: '📜',
      description: 'Couplets and stanzas in authentic Devanagari celebrating feelings, styles, and relationships.',
      path: '/hindi-shayari/',
      count: CONTENT_ITEMS.filter(i => i.type === 'shayari').length
    },
    {
      name: 'English Poetry',
      nameHi: 'अंग्रेजी कविता संग्रह',
      icon: '✒️',
      description: 'Contemporary lyric verse exploring grief, tenderness, and modern sentiment.',
      path: '/english-poetry/',
      count: CONTENT_ITEMS.filter(i => i.type === 'poetry').length
    },
    {
      name: 'Quotes & Thoughts',
      nameHi: 'अनमोल विचार',
      icon: '💬',
      description: 'Philosophical proverbs and contemplative maxims on life, hope, and love.',
      path: '/quotes/',
      count: CONTENT_ITEMS.filter(i => i.type === 'quote').length
    },
    {
      name: 'Poems Anthology',
      nameHi: 'नज़्म व कविता संग्रह',
      icon: '📖',
      description: 'Dedicated collection of Hindi and English free-verse poems and epigrams.',
      path: '/poems/',
      count: CONTENT_ITEMS.filter(i => i.categorySlug.includes('poem')).length
    },
    {
      name: 'Status & Captions',
      nameHi: 'स्टेटस व कैप्शन',
      icon: '📱',
      description: 'Ready-to-copy punchlines with tags for WhatsApp stories, Instagram posts, and reels.',
      path: '/status/',
      count: CONTENT_ITEMS.filter(i => i.type === 'status').length
    },
    {
      name: 'Raj Ki Kalam Originals',
      nameHi: 'मौलिक रचनाएं',
      icon: '✨',
      description: 'Exclusive original compositions and ghazals by author Raj Singh Sengar.',
      path: '/about/'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Categories' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-[#E8DACB] dark:border-[#2E241E]">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-widest">
          <Compass className="w-4 h-4" />
          <span>TOPICS & MOOD DIRECTORY</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE] tracking-tight">
          Explore by Mood & Category
        </h1>

        <p className="font-serif italic text-lg sm:text-xl text-[#785C3A] dark:text-[#D4AF37]">
          "Find the words that match what you feel."
        </p>

        <p className="text-sm text-[#615347] dark:text-[#B6ACA2] max-w-2xl leading-relaxed">
          Browse our comprehensive repository organized by genuine emotional sentiment and literary formats. Click any mood or category card to explore curated verses.
        </p>
      </header>

      {/* MAIN MOODS SECTION */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Browse by Mood • मनोभाव के अनुसार चुनें
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Ten signature emotional states captured in verse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {MOOD_CARDS.map((card) => {
            const count = CONTENT_ITEMS.filter(i => i.mood === card.mood).length;

            return (
              <button
                key={card.mood}
                onClick={() => onNavigate(card.path)}
                className="text-left p-5 rounded-2xl border border-[#DECDBB] dark:border-[#382E25] bg-white dark:bg-[#1E1916] hover:bg-[#F3EBE0] dark:hover:bg-[#251F1A] hover:border-[#8D6527] dark:hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{card.icon}</span>
                    {count > 0 && (
                      <span className="text-[11px] font-semibold text-[#8D6527] dark:text-[#D4AF37] bg-[#F7EFE4] dark:bg-[#2A221C] px-2 py-0.5 rounded-full">
                        {count} verses
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#281F1A] dark:text-[#F3ECE4] group-hover:text-[#8D6527] dark:group-hover:text-[#D4AF37] transition-colors">
                    {card.name}
                  </h3>
                  <span className="text-[11px] text-[#8D6527] dark:text-[#D4AF37] font-medium block mb-2">
                    {card.nameHi}
                  </span>
                  <p className="text-xs text-[#6F6156] dark:text-[#A89D92] leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFE5D7] dark:border-[#2A211B] flex items-center justify-between text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CONTENT TYPES SECTION */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#E8DACB] dark:border-[#2E241E] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            Browse by Content Type • प्रारूप के अनुसार
          </h2>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92] mt-1">
            Complete collections arranged by literary form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_TYPES_DATA.map((type) => (
            <button
              key={type.name}
              onClick={() => onNavigate(type.path)}
              className="text-left p-6 rounded-2xl border border-[#DECDBB] dark:border-[#382E25] bg-[#FDFBF7] dark:bg-[#1E1916] hover:bg-[#F3EBE0] dark:hover:bg-[#251F1A] hover:border-[#8D6527] dark:hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{type.icon}</span>
                  {type.count !== undefined && (
                    <span className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] bg-[#F5EDE1] dark:bg-[#28211B] px-2.5 py-1 rounded-full">
                      {type.count} items
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#281F1A] dark:text-[#F3ECE4] group-hover:text-[#8D6527] dark:group-hover:text-[#D4AF37] transition-colors">
                  {type.name}
                </h3>
                <span className="text-xs text-[#8D6527] dark:text-[#D4AF37] font-medium block mb-2">
                  {type.nameHi}
                </span>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92] leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EFE5D7] dark:border-[#2A211B] flex items-center justify-between text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37]">
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ALL SPECIFIC CATEGORIES LIST */}
      <section className="p-8 rounded-3xl bg-[#F7EFE4]/80 dark:bg-[#1C1714] border border-[#DECBB8] dark:border-[#382D24] space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8D6527] dark:text-[#D4AF37]" />
          <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
            All Individual Topics • सम्पूर्ण विषय सूची
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onNavigate(`/${cat.slug}/`)}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-[#231C18] border border-[#E0D1BF] dark:border-[#382E25] text-left hover:border-[#8D6527] dark:hover:border-[#D4AF37] transition-colors flex items-center justify-between group"
            >
              <span className="truncate font-medium text-[#382D24] dark:text-[#D9D0C5] group-hover:text-[#8D6527] dark:group-hover:text-[#D4AF37]">
                {cat.name}
              </span>
              <ArrowRight className="w-3 h-3 text-[#8D6527] shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
