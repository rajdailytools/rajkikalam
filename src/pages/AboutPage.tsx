import React, { useState } from 'react';
import { Feather, Heart, BookOpen, Sparkles, User, Mail, Compass } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BRAND_INFO } from '../data/content';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'About' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-widest">
            <Feather className="w-4 h-4" />
            <span>LITERARY JOURNAL & PROFILE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
            {lang === 'en' ? 'About Raj Ki Kalam' : 'राज की कलम के बारे में'}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#785C3A] dark:text-[#D4AF37] mt-2">
            {lang === 'en' 
              ? `"${BRAND_INFO.tagline} — Where words turn into soulful companions."` 
              : `"${BRAND_INFO.taglineHi} — जहाँ शब्द दिल की आवाज़ बन जाते हैं।"`}
          </p>
        </div>

        {/* Language Switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EFE8DC] dark:bg-[#231C18] border border-[#D5C2AD] dark:border-[#382E26] self-start sm:self-auto">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              lang === 'en'
                ? 'bg-white dark:bg-[#2C241E] text-[#8D6527] dark:text-[#D4AF37] shadow-xs'
                : 'text-[#6F6156] dark:text-[#A89D92] hover:text-[#211813]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              lang === 'hi'
                ? 'bg-white dark:bg-[#2C241E] text-[#8D6527] dark:text-[#D4AF37] shadow-xs'
                : 'text-[#6F6156] dark:text-[#A89D92] hover:text-[#211813]'
            }`}
          >
            हिंदी
          </button>
        </div>
      </header>

      {/* Main Narrative */}
      {lang === 'en' ? (
        <div className="space-y-10">
          {/* Section 1: About Raj Ki Kalam */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              About Raj Ki Kalam
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              <strong>Raj Ki Kalam</strong> (domain: <span className="font-mono text-xs">{BRAND_INFO.domain}</span>) is a literary platform focused on Hindi Shayari, English Poetry, Quotes, Poems, Status and original writing. Founded with a deep passion for language and emotional resonance, it provides an uncluttered, parchment-inspired reading sanctuary for poetry enthusiasts worldwide.
            </p>
          </section>

          {/* Section 2: Our Purpose */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Our Purpose
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              Words possess the power to soothe aching hearts, articulate silent memories, and kindle renewed hope. Our purpose is to elevate poetry reading above the frantic pace of modern social feeds, giving readers space to pause, reflect, and share deeply meaningful couplets and poems with their loved ones.
            </p>
          </section>

          {/* Section 3: What We Publish */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              What We Publish
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  Hindi Shayari & 2-Line Couplets
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  Authentic verses covering Love, Sadness (Dard), Separation (Bewafa), Royal Attitude, and timeless Friendship (Dosti).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  English Poetry & Epigrams
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  Lyrical poems capturing quiet melancholy, heartbreak, intimate warmth, and philosophical resilience.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  Quotes & Philosophical Thoughts
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  Curated thoughts on human relationships, resilience, forgiveness, and the pursuit of peace.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  Status & Social Captions
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  Crafted lines with hashtags for WhatsApp status updates, Instagram posts, and reels.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Original Writing */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Original Writing
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              {BRAND_INFO.name} is designed as the primary platform where original writings, ghazals, and free-verse poetry by author {BRAND_INFO.author} will be chronicled and published. The current demonstration content serves to demonstrate the typographic presentation and reader workflows until the author's upcoming poetry collections are released.
            </p>
          </section>

          {/* Section 5: Content Philosophy */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              Content Philosophy
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              We uphold dignity, artistic sincerity, and emotional depth. We avoid vulgarity, aggressive advertising overlays, and misleading clickbait. Every card is structured for comfortable reading, one-click copying, bookmarking, and respectful sharing.
            </p>
          </section>

          {/* Section 6: Author Information */}
          <section className="p-7 rounded-3xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DECBB8] dark:border-[#382D22] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>AUTHOR & FOUNDER</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
                {BRAND_INFO.author}
              </h3>
              <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                Creator, author, and curator of Raj Ki Kalam (RajKiKalam.in).
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{BRAND_INFO.email}</span>
              </a>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Section 1: About (Hindi) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              राज की कलम के बारे में
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              <strong>राज की कलम</strong> (डोमेन: <span className="font-mono text-xs">{BRAND_INFO.domain}</span>) एक स्वतंत्र साहित्यिक मंच है जो हिंदी शायरी, अंग्रेजी कविता, अनमोल विचार, नज़्में, स्टेटस और मौलिक लेखन को समर्पित है। इसकी स्थापना भाषा के सौंदर्य और रूहानी अहसासों को सहेजने के लिए की गई है।
            </p>
          </section>

          {/* Section 2: Purpose (Hindi) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              हमारा उद्देश्य
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              लफ़्ज़ों में दिल के दर्द को सुकून देने और खामोशी को आवाज़ देने की ताकत होती है। हमारा उद्देश्य पाठकों को बिना किसी शोर-शराबे और रुकावट के एक शुद्ध साहित्यिक माहौल प्रदान करना है जहाँ हर शेर और नज़्म दिल तक पहुंचे।
            </p>
          </section>

          {/* Section 3: What We Publish (Hindi) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              हम क्या प्रकाशित करते हैं
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  हिंदी शायरी व २-लाइन दोहे
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  इश्क़, दर्द, तन्हाई, वफ़ा-बेवफ़ाई, तेवर (Attitude) और दोस्ती पर आधारित चुनिंदा पंक्तियाँ।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  अंग्रेजी कविताएं व नज़्में
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  जुदाई, उदासी, सुकून और रूहानी अहसासों पर लिखी गई समकालीन अंग्रेजी कविताएं।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  अनमोल विचार व सुविचार
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  ज़िन्दगी, रिश्तों, सब्र और मानवीय संवेदनाओं को छूते हुए प्रेरक विचार।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25]">
                <h3 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4] mb-1">
                  स्टेटस व इंस्टाग्राम कैप्शन
                </h3>
                <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                  व्हाट्सएप और इंस्टाग्राम के लिए आसानी से कॉपी व शेयर किए जाने वाले खूबसूरत स्टेटस।
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Original Writing (Hindi) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              मूल एवं मौलिक रचनाएँ
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              राज की कलम लेखक {BRAND_INFO.author} की व्यक्तिगत व मूल साहित्यिक कृतियों का आधिकारिक मंच है। वर्तमान में प्रदर्शित डेमो रचनाएं लेआउट प्रदर्शन के लिए हैं, जिन्हें लेखक द्वारा अपनी मूल रचनाओं से बदला जाएगा।
            </p>
          </section>

          {/* Section 5: Content Philosophy (Hindi) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              हमारी साहित्यिक विचारधारा
            </h2>
            <p className="text-base text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed">
              हम गरिमा, कलात्मक निष्ठा और भावनात्मक गहराई को सर्वोपरि मानते हैं। किसी भी प्रकार के भ्रामक विज्ञापनों या सतही सामग्री से दूर, हमारा प्रयास पाठकों को एक उत्कृष्ट और यादगार अनुभव देना है।
            </p>
          </section>

          {/* Section 6: Author Info (Hindi) */}
          <section className="p-7 rounded-3xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DECBB8] dark:border-[#382D22] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>लेखक एवं संस्थापक</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#281F1A] dark:text-[#F3ECE4]">
                {BRAND_INFO.author}
              </h3>
              <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
                राज की कलम ({BRAND_INFO.domain}) के रचनाकार एवं संस्थापक।
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{BRAND_INFO.email}</span>
              </a>
            </div>
          </section>
        </div>
      )}

    </div>
  );
};
