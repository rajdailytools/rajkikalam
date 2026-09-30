import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ShareModal } from './components/ShareModal';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { IndividualShayariPage } from './pages/IndividualShayariPage';
import { EnglishPoetryPage } from './pages/EnglishPoetryPage';
import { QuotesPage } from './pages/QuotesPage';
import { PoemsPage } from './pages/PoemsPage';
import { StatusPage } from './pages/StatusPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SavedPage } from './pages/SavedPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage, LegalDocType } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ContentItem } from './types';
import { BRAND_INFO } from './data/content';

// Dynamic SEO metadata mapping
const ROUTE_SEO: Record<string, { title: string; desc: string }> = {
  '/': {
    title: `${BRAND_INFO.name} — Hindi Shayari, English Poetry, Quotes & Status`,
    desc: `Official platform of ${BRAND_INFO.name} by author ${BRAND_INFO.author}. Hindi Shayari, English Poetry, Quotes, Poems, and Status. ${BRAND_INFO.tagline}.`
  },
  '/hindi-shayari/': {
    title: `Hindi Shayari Collection • हिंदी शायरी संग्रह — ${BRAND_INFO.name}`,
    desc: 'Explore heart-touching Hindi Shayari, 2-line couplets, romantic, and sad Shayari with copy and share.'
  },
  '/sad-shayari/': {
    title: `100+ Sad Shayari in Hindi • दर्द भरी उदास शायरी — ${BRAND_INFO.name}`,
    desc: 'Heart Touching Sad Shayari, Dard Bhari Shayari & 2 Line Shayari for WhatsApp and Instagram.'
  },
  '/sad-shayari-in-hindi/': {
    title: `100+ Sad Shayari in Hindi • दर्द भरी उदास शायरी — ${BRAND_INFO.name}`,
    desc: 'Heart Touching Sad Shayari, Dard Bhari Shayari & 2 Line Shayari for WhatsApp and Instagram.'
  },
  '/love-shayari/': {
    title: `Love Shayari in Hindi • इश्क़ और मोहब्बत शायरी — ${BRAND_INFO.name}`,
    desc: 'Heartfelt Love Shayari, romantic verses, and emotional couplets in Hindi.'
  },
  '/2-line-shayari/': {
    title: `2 Line Shayari in Hindi • दो लाइन शायरी — ${BRAND_INFO.name}`,
    desc: 'Deep and concise 2 line Hindi Shayari couplets for WhatsApp status and captions.'
  },
  '/dard-shayari/': {
    title: `Dard Shayari in Hindi • गहरा दर्द शायरी संग्रह — ${BRAND_INFO.name}`,
    desc: 'Soulful Dard Shayari expressing emotional pain, quiet tears, and unspoken heartache.'
  },
  '/attitude-shayari/': {
    title: `Attitude Shayari in Hindi • तेवर और अंदाज़ शायरी — ${BRAND_INFO.name}`,
    desc: 'Royal Attitude Shayari, self-respect, and bold couplets in Hindi.'
  },
  '/dosti-shayari/': {
    title: `Dosti Shayari in Hindi • सच्ची दोस्ती शायरी — ${BRAND_INFO.name}`,
    desc: 'Heartwarming Dosti Shayari celebrating friendship, trust, and lifelong camaraderie.'
  },
  '/romantic-shayari/': {
    title: `Romantic Shayari in Hindi • रूमानी शायरी — ${BRAND_INFO.name}`,
    desc: 'Sweet romantic Hindi Shayari, moonlit conversations, and intimate expressions.'
  },
  '/breakup-shayari/': {
    title: `Breakup Shayari in Hindi • जुदाई शायरी — ${BRAND_INFO.name}`,
    desc: 'Poignant verses on parting paths, silent heartbreak, and healing with dignity.'
  },
  '/emotional-shayari/': {
    title: `Emotional Shayari in Hindi • भावुक शायरी — ${BRAND_INFO.name}`,
    desc: 'Deep emotional Hindi couplets reflecting raw tenderness and unspoken sorrow.'
  },
  '/alone-shayari/': {
    title: `Alone Shayari in Hindi • तन्हाई शायरी — ${BRAND_INFO.name}`,
    desc: 'Quiet solitude and midnight contemplation couplets in Hindi.'
  },
  '/bewafa-shayari/': {
    title: `Bewafa Shayari in Hindi • बेवफ़ा शायरी — ${BRAND_INFO.name}`,
    desc: 'Deep verses on broken trust, separation, and unfulfilled promises.'
  },
  '/heart-touching-shayari/': {
    title: `Heart Touching Shayari in Hindi • दिल छू लेने वाली शायरी — ${BRAND_INFO.name}`,
    desc: 'Soul-stirring Hindi Shayari couplets touching the deepest chords of the heart.'
  },
  '/family-shayari/': {
    title: `Family Shayari in Hindi • परिवार शायरी — ${BRAND_INFO.name}`,
    desc: 'Touching verses honoring parents, home, and family ties in Hindi.'
  },
  '/mohabbat-shayari/': {
    title: `Mohabbat Shayari in Hindi • सच्ची मोहब्बत शायरी — ${BRAND_INFO.name}`,
    desc: 'Classical and contemporary verses celebrating selfless, eternal devotion.'
  },
  '/english-poetry/': {
    title: `English Poetry Collection • Contemporary Verses — ${BRAND_INFO.name}`,
    desc: 'Soulful modern English poems on love, heartbreak, solitude, and resilience.'
  },
  '/sad-poetry/': {
    title: `50+ Short Sad Poems & Heartbreak Poetry — ${BRAND_INFO.name}`,
    desc: 'Melancholic and contemplative English poems exploring loss, memory, and quiet healing.'
  },
  '/love-poetry/': {
    title: `Love Poetry • Verses of Devotion & Warmth — ${BRAND_INFO.name}`,
    desc: 'Contemporary lyrical English poems celebrating intimacy, tenderness, and enduring affection.'
  },
  '/heartbreak-poetry/': {
    title: `Heartbreak Poetry & Elegy — ${BRAND_INFO.name}`,
    desc: 'Raw and moving English poems tracing the fractures of parting and quiet recovery.'
  },
  '/short-poems/': {
    title: `Short Poems & Epigrams — ${BRAND_INFO.name}`,
    desc: 'Concise, striking micro-poems and epigrams that linger in the mind.'
  },
  '/quotes/': {
    title: `Quotes & Deep Thoughts • अनमोल विचार — ${BRAND_INFO.name}`,
    desc: 'Inspiring life quotes, relationship thoughts, and philosophical reflections in Hindi & English.'
  },
  '/poems/': {
    title: `Poem Anthology • नज़्म व कविता संग्रह — ${BRAND_INFO.name}`,
    desc: 'Complete anthology of Hindi poems, English lyric verse, and upcoming original writings.'
  },
  '/status/': {
    title: `WhatsApp Status & Instagram Captions — ${BRAND_INFO.name}`,
    desc: 'Ready-to-copy quotes and status messages for WhatsApp, Instagram posts, and Facebook.'
  },
  '/categories/': {
    title: `Explore by Mood & Category • श्रेणियाँ — ${BRAND_INFO.name}`,
    desc: 'Browse our complete library of Hindi Shayari, English poetry, quotes, and status by mood.'
  },
  '/saved/': {
    title: `Saved Words & Favorites • सहेजे गए अल्फ़ाज़ — ${BRAND_INFO.name}`,
    desc: 'Your private favorites collection stored locally in your browser.'
  },
  '/about/': {
    title: `About ${BRAND_INFO.name} • राज की कलम के बारे में`,
    desc: `Learn about our mission, author ${BRAND_INFO.author}, and the original poetry published on ${BRAND_INFO.domain}.`
  },
  '/contact/': {
    title: `Contact Us • संपर्क व संवाद — ${BRAND_INFO.name}`,
    desc: `Get in touch with author ${BRAND_INFO.author} at ${BRAND_INFO.email} for general inquiries, feedback, or copyright takedown requests.`
  },
  '/privacy-policy/': {
    title: `Privacy Policy • गोपनीयता नीति — ${BRAND_INFO.name}`,
    desc: 'Our transparent privacy policy covering data handling, cookies, and local storage.'
  },
  '/disclaimer/': {
    title: `Disclaimer • अस्वीकरण — ${BRAND_INFO.name}`,
    desc: `Content purpose and attribution disclaimer for ${BRAND_INFO.domain}.`
  },
  '/terms-and-conditions/': {
    title: `Terms & Conditions • नियम व शर्तें — ${BRAND_INFO.name}`,
    desc: `Terms of service and permitted use for readers on ${BRAND_INFO.domain}.`
  },
  '/copyright/': {
    title: `Copyright Policy • कॉपीराइट नीति — ${BRAND_INFO.name}`,
    desc: `Original content ownership and takedown notice procedure for ${BRAND_INFO.name} by author ${BRAND_INFO.author}.`
  },
  '/advertising-policy/': {
    title: `Advertising & Ad Disclosure • विज्ञापन प्रकटीकरण — ${BRAND_INFO.name}`,
    desc: `Advertising standards and Google AdSense disclosures for ${BRAND_INFO.domain}.`
  },
};

/**
 * Normalizes any incoming pathname or hash into a clean canonical route format
 */
function normalizeRoute(raw: string): string {
  if (!raw) return '/';
  
  // If hash is present (e.g. #/about/ or #/hindi-shayari/), prioritize hash
  let target = raw;
  if (raw.includes('#')) {
    const hashPart = raw.split('#')[1]?.split('?')[0]?.trim();
    if (hashPart && hashPart.startsWith('/')) {
      target = hashPart;
    }
  }

  // Strip query parameters
  target = target.split('?')[0].trim();

  // Strip index.html or /preview suffixes
  target = target.replace(/\/index\.html\/?$/i, '/');
  target = target.replace(/^\/preview\/?/i, '/');

  // Collapse multiple slashes
  target = target.replace(/\/+/g, '/');

  if (target === '' || target === '.') return '/';
  return target.endsWith('/') ? target : `${target}/`;
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return normalizeRoute(window.location.hash.slice(1));
  }

  const p = window.location.pathname;
  if (!p || p === '/' || p === '/index.html') return '/';
  return normalizeRoute(p);
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareItem, setShareItem] = useState<ContentItem | null>(null);

  // Sync route with browser history and document metadata
  const navigateTo = useCallback((path: string) => {
    const formatted = normalizeRoute(path);
    setCurrentPath(formatted);

    try {
      window.history.pushState({}, '', formatted);
    } catch {
      window.location.hash = formatted;
    }

    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }

    // Dynamic SEO metadata updater
    const seo = ROUTE_SEO[formatted] || {
      title: `${BRAND_INFO.name} — Hindi Shayari, English Poetry, Quotes & Status`,
      desc: `Official platform of ${BRAND_INFO.name}. Alfaaz • Ehsaas • Poetry.`
    };
    document.title = seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://${BRAND_INFO.domain}${formatted}`);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://${BRAND_INFO.domain}${formatted}`);
  }, []);

  // Listen to popstate and hashchange
  useEffect(() => {
    const handleUrlChange = () => {
      let p = window.location.pathname;
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        p = window.location.hash.slice(1);
      }
      const formatted = normalizeRoute(p);
      setCurrentPath(formatted);
      try {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Determine active page component based on normalized currentPath
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '/index.html/') {
      return <HomePage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 2. Hindi Shayari and subcategories
    if (
      currentPath === '/hindi-shayari/' ||
      currentPath.endsWith('-shayari/') ||
      currentPath === '/sad-shayari-in-hindi/'
    ) {
      const slug = currentPath.replace(/^\/|\/$/g, '');
      return <IndividualShayariPage categorySlug={slug} onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 3. English Poetry and subcategories
    if (
      currentPath === '/english-poetry/' ||
      currentPath.endsWith('-poetry/') ||
      currentPath === '/short-poems/' ||
      currentPath === '/romantic-poems/' ||
      currentPath === '/emotional-poems/'
    ) {
      return <EnglishPoetryPage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 4. Quotes and subcategories
    if (currentPath === '/quotes/' || currentPath.endsWith('-quotes/')) {
      return <QuotesPage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 5. Poems Anthology and subcategories
    if (currentPath === '/poems/' || currentPath.endsWith('-poems/')) {
      return <PoemsPage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 6. Status & Captions
    if (
      currentPath === '/status/' ||
      currentPath.endsWith('-status/') ||
      currentPath.endsWith('-captions/')
    ) {
      return <StatusPage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 7. Categories Directory
    if (currentPath === '/categories/') {
      return <CategoriesPage onNavigate={navigateTo} />;
    }

    // 8. Saved Words
    if (currentPath === '/saved/') {
      return <SavedPage onNavigate={navigateTo} onOpenShare={setShareItem} />;
    }

    // 9. About & Contact
    if (currentPath === '/about/') {
      return <AboutPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/contact/') {
      return <ContactPage onNavigate={navigateTo} />;
    }

    // 10. Legal Pages
    if (currentPath === '/privacy-policy/') {
      return <LegalPage type="privacy" onNavigate={navigateTo} />;
    }
    if (currentPath === '/disclaimer/') {
      return <LegalPage type="disclaimer" onNavigate={navigateTo} />;
    }
    if (currentPath === '/terms-and-conditions/') {
      return <LegalPage type="terms" onNavigate={navigateTo} />;
    }
    if (currentPath === '/copyright/') {
      return <LegalPage type="copyright" onNavigate={navigateTo} />;
    }
    if (currentPath === '/advertising-policy/') {
      return <LegalPage type="advertising" onNavigate={navigateTo} />;
    }

    // Fallback 404
    return <NotFoundPage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#151210] text-[#2C2420] dark:text-[#F1ECE6] font-sans selection:bg-[#EADBCE] dark:selection:bg-[#3D3126] transition-colors duration-200">
      
      {/* Global Header with Desktop Mega-Menus and Mobile Drawer */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Search Panel */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenShare={(item) => {
          setSearchOpen(false);
          setShareItem(item);
        }}
        onSelectCategory={(slug) => navigateTo(`/${slug}/`)}
      />

      {/* Global Share Modal */}
      <ShareModal
        item={shareItem}
        onClose={() => setShareItem(null)}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
