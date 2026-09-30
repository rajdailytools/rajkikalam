import React, { useState } from 'react';
import { ShieldCheck, FileText, AlertCircle, Copyright, Megaphone, Mail } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BRAND_INFO } from '../data/content';

export type LegalDocType = 'privacy' | 'disclaimer' | 'terms' | 'copyright' | 'advertising';

interface LegalPageProps {
  type: LegalDocType;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const configs: Record<LegalDocType, {
    titleEn: string;
    titleHi: string;
    crumbLabel: string;
    icon: React.ElementType;
  }> = {
    privacy: {
      titleEn: "Privacy Policy",
      titleHi: "गोपनीयता नीति (Privacy Policy)",
      crumbLabel: "Privacy Policy",
      icon: ShieldCheck,
    },
    disclaimer: {
      titleEn: "Disclaimer",
      titleHi: "अस्वीकरण (Disclaimer)",
      crumbLabel: "Disclaimer",
      icon: AlertCircle,
    },
    terms: {
      titleEn: "Terms & Conditions",
      titleHi: "नियम एवं शर्तें (Terms & Conditions)",
      crumbLabel: "Terms & Conditions",
      icon: FileText,
    },
    copyright: {
      titleEn: "Copyright Policy",
      titleHi: "कॉपीराइट नीति (Copyright Policy)",
      crumbLabel: "Copyright",
      icon: Copyright,
    },
    advertising: {
      titleEn: "Advertising & Ad Disclosure",
      titleHi: "विज्ञापन व प्रकटीकरण नीति (Advertising Disclosure)",
      crumbLabel: "Advertising Policy",
      icon: Megaphone,
    }
  };

  const currentConfig = configs[type];
  const IconComponent = currentConfig.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: currentConfig.crumbLabel }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-widest">
            <IconComponent className="w-4 h-4" />
            <span>LEGAL & COMPLIANCE • आधिकारिक नीतियां</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
            {lang === 'en' ? currentConfig.titleEn : currentConfig.titleHi}
          </h1>

          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92]">
            Effective Date: March 2026 • Platform: {BRAND_INFO.domain} • Author: {BRAND_INFO.author}
          </p>
        </div>

        {/* Language Switcher for Legal Policy */}
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

      {/* Policy Content */}
      <article className="prose prose-stone dark:prose-invert max-w-none text-[#4A3D33] dark:text-[#C8BFB5] leading-relaxed space-y-6 text-sm">
        
        {/* ================= PRIVACY POLICY ================= */}
        {type === 'privacy' && lang === 'en' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">1. Information We Collect</h2>
              <p>
                {BRAND_INFO.name} ({BRAND_INFO.domain}), founded by {BRAND_INFO.author}, operates primarily as a public poetry and literary platform. We do not require mandatory account registration to enjoy our verses. We only collect information voluntarily provided by you, such as your name and email address when using our contact form or subscribing to our newsletter.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">2. Local Storage & Client-Side Preferences</h2>
              <p>
                We use browser <code>localStorage</code> solely to preserve your private reading preferences, including your bookmarked/favorited Shayari and your light/dark theme preference. This data remains on your personal device and is never sent to external tracking servers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">3. Cookies, Analytics & Web Beacons</h2>
              <p>
                We may use standard web cookies and performance analytics to monitor overall readership trends, popular categories, and page loading speeds to continually improve our layout and readability.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">4. Advertising & Third-Party Services</h2>
              <p>
                In the future, {BRAND_INFO.domain} may display clean, non-intrusive third-party advertisements or use advertising services such as Google AdSense if enabled. Third-party ad vendors use cookies to serve relevant ads based on prior web visits. Users can opt out of personalized ads via Google Ads Settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">5. Data Security, Retention & User Rights</h2>
              <p>
                We implement industry-standard safeguards to protect any submitted communication. Inquiries are retained only as long as necessary to address your feedback. You may request deletion of any correspondence by emailing <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>.
              </p>
            </section>
          </div>
        )}

        {type === 'privacy' && lang === 'hi' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">१. हमारे द्वारा एकत्रित जानकारी</h2>
              <p>
                राज की कलम ({BRAND_INFO.domain}), जिसके संस्थापक {BRAND_INFO.author} हैं, एक खुला साहित्यिक मंच है। यहाँ शायरी व कविताएं पढ़ने के लिए किसी पंजीकरण की आवश्यकता नहीं है। संपर्क फ़ॉर्म या न्यूज़लेटर के माध्यम से स्वेच्छा से दिया गया नाम या ईमेल केवल संवाद हेतु उपयोग होता है।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">२. लोकल स्टोरेज (Local Storage) का उपयोग</h2>
              <p>
                वेबसाइट आपकी पसंदीदा शायरी (Saved Favorites) और डार्क/लाइट थीम की पसंद को याद रखने के लिए आपके ब्राउज़र के <code>localStorage</code> का उपयोग करती है। यह डेटा पूरी तरह से आपके व्यक्तिगत उपकरण पर सुरक्षित रहता है।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">३. कुकीज़ और विज्ञापन नीतियाँ</h2>
              <p>
                भविष्य में RajKiKalam.in पर साफ-सुथरे विज्ञापन प्रदर्शित किए जा सकते हैं (जैसे Google AdSense यदि सक्षम किया जाए)। ये सेवाएँ उपयोगकर्ता की रुचि के अनुसार विज्ञापन दिखाने के लिए कुकीज़ का उपयोग कर सकती हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">४. संपर्क सूत्र</h2>
              <p>
                गोपनीयता नीति से संबंधित प्रश्नों के लिए आप हमसे <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a> पर संपर्क कर सकते हैं।
              </p>
            </section>
          </div>
        )}

        {/* ================= DISCLAIMER ================= */}
        {type === 'disclaimer' && lang === 'en' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">1. General Information & Purpose</h2>
              <p>
                All content published on {BRAND_INFO.domain} is intended solely for poetic appreciation, cultural preservation, personal contemplation, and literary reflection. 
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">2. Poetry, Demo Content & Attribution</h2>
              <p>
                The website currently presents placeholder demo writings to illustrate the layout, typography, and image generation features. The author, {BRAND_INFO.author}, does not claim authorship over demo placeholder lines and will progressively publish original copyrighted poetry. Traditional folk couplets and proverbs are shared in good faith with cultural reverence.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">3. External Links & User Responsibility</h2>
              <p>
                {BRAND_INFO.domain} provides sharing links to third-party platforms (WhatsApp, X, Facebook, Telegram, Pinterest). We do not control and assume no responsibility for external third-party content or policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">4. Contact & Inquiries</h2>
              <p>
                For questions regarding attributions or content accuracy, email us directly at <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>.
              </p>
            </section>
          </div>
        )}

        {type === 'disclaimer' && lang === 'hi' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">१. सामान्य जानकारी व उद्देश्य</h2>
              <p>
                राज की कलम ({BRAND_INFO.domain}) पर प्रस्तुत सभी शायरी, कविताएँ और सुविचार केवल साहित्यिक अभिरुचि, मनोरंजन और भावनात्मक अभिव्यक्ति के उद्देश्य से प्रस्तुत किए गए हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">२. डेमो रचनाएँ व लेखक स्पष्टीकरण</h2>
              <p>
                वर्तमान में प्रदर्शित सामग्री केवल वेबसाइट लेआउट व डिज़ाइन प्रदर्शन हेतु डेमो नमूने हैं। लेखक {BRAND_INFO.author} इन डेमो रचनाओं पर व्यक्तिगत दावा नहीं करते और जल्द ही अपनी मूल रचनाएँ यहाँ प्रस्तुत करेंगे।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">३. बाहरी लिंक्स व संपर्क</h2>
              <p>
                किसी भी सुधार या स्पष्टीकरण हेतु आप हमें सीधे <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a> पर लिख सकते हैं।
              </p>
            </section>
          </div>
        )}

        {/* ================= TERMS & CONDITIONS ================= */}
        {type === 'terms' && lang === 'en' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">1. Acceptance of Terms</h2>
              <p>
                By visiting or reading content on {BRAND_INFO.domain}, you agree to adhere to these Terms & Conditions. If you disagree with any provision, please discontinue using the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">2. Permitted & Prohibited Use</h2>
              <p>
                You are welcome to read, bookmark, copy short couplets for personal WhatsApp/Instagram status updates with attribution, and download generated poetry cards. Systematic scraping, automated data harvesting, or commercial republication without written consent from author {BRAND_INFO.author} is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">3. Limitation of Liability & Contact</h2>
              <p>
                {BRAND_INFO.name} provides its literary archive "as is". We are not liable for any indirect disruptions. For terms inquiries, write to <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>.
              </p>
            </section>
          </div>
        )}

        {type === 'terms' && lang === 'hi' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">१. नियमों की स्वीकृति</h2>
              <p>
                राज की कलम वेबसाइट ({BRAND_INFO.domain}) का उपयोग करके आप इन नियमों और शर्तों का पूर्णतः पालन करने की सहमति देते हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">२. अनुमत एवं वर्जित गतिविधियाँ</h2>
              <p>
                आप अपने व्यक्तिगत सोशल मीडिया स्टेटस या कैप्शन में शायरी साझा कर सकते हैं। पूरी वेबसाइट के थोक डेटा स्क्रैपिंग (Scraping) या अनधिकृत व्यावसायिक पुनरुत्पादन की अनुमति नहीं है।
              </p>
            </section>
          </div>
        )}

        {/* ================= COPYRIGHT POLICY ================= */}
        {type === 'copyright' && lang === 'en' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">1. Original Content Ownership</h2>
              <p>
                The brand name "{BRAND_INFO.name}", logo insignia, graphic layout, original poems, and future writings by author {BRAND_INFO.author} are protected under copyright laws. All rights reserved.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">2. Copyright Complaint & Takedown Process</h2>
              <p>
                If you are a copyright owner or authorized agent and believe that any text or material on {BRAND_INFO.domain} infringes upon your copyright, please submit an infringement notice to <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline font-mono">{BRAND_INFO.email}</a> with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Specific description and title of the copyrighted work.</li>
                <li>Exact URL link on {BRAND_INFO.domain} where the material appears.</li>
                <li>Contact information of the rights holder.</li>
              </ul>
              <p>
                We investigate all legitimate complaints promptly and will remove or correct infringing material without delay.
              </p>
            </section>
          </div>
        )}

        {type === 'copyright' && lang === 'hi' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">१. मूल सामग्री व बौद्धिक संपदा</h2>
              <p>
                राज की कलम ({BRAND_INFO.name}) का नाम, लोगो, ग्राफिक कार्ड्स और लेखक {BRAND_INFO.author} की भविष्य की मूल रचनाएँ कॉपीराइट कानूनों के तहत सुरक्षित हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">२. कॉपीराइट शिकायत व टेकडाउन</h2>
              <p>
                यदि आपको लगता है कि किसी सामग्री से आपके बौद्धिक संपदा अधिकारों का उल्लंघन हुआ है, तो कृपया <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a> पर प्रासंगिक लिंक और साक्ष्य के साथ सूचित करें। हम तुरंत उचित कार्रवाई करेंगे।
              </p>
            </section>
          </div>
        )}

        {/* ================= ADVERTISING & ADSENSE POLICY ================= */}
        {type === 'advertising' && lang === 'en' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">1. Advertising Overview</h2>
              <p>
                To sustain the hosting, curation, and development of {BRAND_INFO.domain}, this website may display advertisements in the future or may use advertising services such as Google AdSense if enabled. 
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">2. Third-Party Advertising Vendors & Cookies</h2>
              <p>
                Third-party vendors, including Google, may use cookies to serve advertisements based on a user's previous visits to this website or other websites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">3. Personalized & Non-Personalized Advertising</h2>
              <p>
                Where applicable, users may receive personalized advertisements tailored to their browsing interests, or non-personalized advertisements based on general contextual parameters. Users may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#8D6527] underline">Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#8D6527] underline">www.aboutads.info</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">4. User Interaction & Clear Placement Standards</h2>
              <p>
                We do not encourage users to click advertisements. We do not place misleading advertisement labels, nor do we position advertisements within critical navigation elements or action buttons where accidental clicks could occur. Content integrity and reading comfort remain our priority.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">5. External Advertiser Links</h2>
              <p>
                Advertisements may direct you to external third-party websites. {BRAND_INFO.name} does not endorse and is not responsible for the products, claims, services, or privacy practices of external advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">6. Advertising Questions</h2>
              <p>
                For advertising-related questions, feedback, or sponsorship inquiries, please contact:
              </p>
              <p className="font-mono text-sm bg-white dark:bg-[#1E1916] p-3 rounded-xl border border-[#D5C2AD] dark:border-[#382E26] inline-block">
                Email: <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>
              </p>
            </section>
          </div>
        )}

        {type === 'advertising' && lang === 'hi' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">१. विज्ञापन प्रकटीकरण का उद्देश्य</h2>
              <p>
                राज की कलम ({BRAND_INFO.domain}) के रखरखाव, सर्वर संचालन और साहित्यिक विकास को बनाए रखने के लिए, यह वेबसाइट भविष्य में विज्ञापन प्रदर्शित कर सकती है या Google AdSense जैसी विज्ञापन सेवाओं का उपयोग कर सकती है (यदि सक्षम किया जाए)।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">२. थर्ड-पार्टी विज्ञापन व कुकीज़</h2>
              <p>
                Google सहित अन्य थर्ड-पार्टी विज्ञापन सेवा प्रदाता इंटरनेट पर उपयोगकर्ता की पिछली विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग कर सकते हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">३. व्यक्तिगत व गैर-व्यक्तिगत विज्ञापन</h2>
              <p>
                पाठक Google के <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#8D6527] underline">Ads Settings</a> पर जाकर व्यक्तिगत विज्ञापनों को ऑप्ट-आउट कर सकते हैं।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">४. विज्ञापन नीतियां व पाठक अनुभव</h2>
              <p>
                हम पाठकों को विज्ञापनों पर क्लिक करने के लिए प्रेरित नहीं करते हैं और न ही भ्रामक विज्ञापन लेबल लगाते हैं। हमारी प्राथमिकता पाठकों को शुद्ध, सम्मानजनक और बिना किसी व्यवधान के शायरी पढ़ने का अनुभव प्रदान करना है।
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-serif text-[#281F1A] dark:text-[#F3ECE4]">५. विज्ञापन से संबंधित संपर्क</h2>
              <p>
                विज्ञापन या साझेदारी संबंधी किसी भी प्रश्न के लिए संपर्क करें:
              </p>
              <p className="font-mono text-sm bg-white dark:bg-[#1E1916] p-3 rounded-xl border border-[#D5C2AD] dark:border-[#382E26] inline-block">
                ईमेल: <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>
              </p>
            </section>
          </div>
        )}

      </article>

      {/* Footer Contact box for all legal pages */}
      <div className="p-6 rounded-2xl bg-[#F6EFE5] dark:bg-[#1E1916] border border-[#E3D6C5] dark:border-[#382E25] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-[#281F1A] dark:text-[#F3ECE4]">
            Have questions about this policy?
          </h4>
          <p className="text-xs text-[#6F6156] dark:text-[#A89D92]">
            Contact author {BRAND_INFO.author} directly for any legal, copyright or advertising inquiries.
          </p>
        </div>

        <a
          href={`mailto:${BRAND_INFO.email}`}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-semibold transition-colors shrink-0"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{BRAND_INFO.email}</span>
        </a>
      </div>
    </div>
  );
};
