import React from 'react';
import { Feather, Heart, Mail } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F4ECE0] dark:bg-[#15110E] border-t border-[#E5D7C6] dark:border-[#2C231B] text-[#55473E] dark:text-[#AFA499] transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 text-left mb-4 group focus-visible:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8DDD0] dark:bg-[#251E19] border border-[#C5B49F] dark:border-[#42372D] flex items-center justify-center text-[#8D6527] dark:text-[#D4AF37]">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-tight text-[#2B211A] dark:text-[#F3ECE4] leading-tight">
                  {BRAND_INFO.name}
                </span>
                <span className="block text-[10px] tracking-widest text-[#7B6E63] dark:text-[#A89D92] font-semibold uppercase">
                  {BRAND_INFO.tagline}
                </span>
              </div>
            </button>
            <p className="text-xs text-[#6F6156] dark:text-[#A09489] leading-relaxed mb-4">
              एक रूहानी साहित्यिक मंच जहाँ हिंदी शायरी, अंग्रेजी कविताएं, सुविचार और स्टेटस दिल की गहराई से बयां होते हैं। अल्फ़ाज़ जो दिल तक पहुँच जाएं।
            </p>
            <div className="space-y-1 text-xs text-[#7B6E63] dark:text-[#9A8D81]">
              <div>
                <span className="font-semibold text-[#281F1A] dark:text-[#F3ECE4]">Author: </span>
                {BRAND_INFO.author}
              </div>
              <div>
                <span className="font-semibold text-[#281F1A] dark:text-[#F3ECE4]">Domain: </span>
                <span className="font-mono text-[11px]">{BRAND_INFO.domain}</span>
              </div>
              <div className="pt-1">
                <a 
                  href={`mailto:${BRAND_INFO.email}`}
                  className="inline-flex items-center gap-1.5 text-[#8D6527] dark:text-[#D4AF37] font-medium hover:underline text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#2A201A] dark:text-[#F3ECE4] uppercase tracking-wider mb-3">
              Explore • संग्रह
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/hindi-shayari/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Hindi Shayari (हिंदी शायरी)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/english-poetry/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  English Poetry (कविताएं)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/quotes/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Quotes (अनमोल विचार)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/poems/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Poems (नज़्म संग्रह)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/status/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Status & Captions (स्टेटस)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/categories/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Categories (सभी श्रेणियाँ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#2A201A] dark:text-[#F3ECE4] uppercase tracking-wider mb-3">
              Company • मंच
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/about/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  About (हमारे बारे में)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Contact (संपर्क करें)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/saved/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Saved Shayari (सहेजी गई शायरी)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#2A201A] dark:text-[#F3ECE4] uppercase tracking-wider mb-3">
              Legal • नीतियां
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/privacy-policy/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Privacy Policy (गोपनीयता)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Disclaimer (अस्वीकरण)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms-and-conditions/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Terms & Conditions (नियम)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/copyright/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Copyright (कॉपीराइट)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/advertising-policy/')} className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors">
                  Advertising Policy (विज्ञापन नीति)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Channels (Placeholders per prompt) */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#2A201A] dark:text-[#F3ECE4] uppercase tracking-wider mb-3">
              Social • संवाद
            </h4>
            <ul className="space-y-2 text-xs text-[#6F6156] dark:text-[#A89D92]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">Instagram</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">Facebook</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">Pinterest</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">YouTube</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">X (Twitter)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527]" />
                <span title="Placeholder link">WhatsApp</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-[#DECBB8] dark:border-[#2A211B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7B6E63] dark:text-[#8F8276]">
          <div>
            <p>© 2026 {BRAND_INFO.name} ({BRAND_INFO.domain}). All rights reserved.</p>
            <p className="mt-0.5 text-[11px]">
              Author: <span className="font-medium text-[#281F1A] dark:text-[#F3ECE4]">{BRAND_INFO.author}</span> • Contact: <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8D6527] underline">{BRAND_INFO.email}</a>
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#B84030] fill-[#B84030]" />
            <span>for lovers of poetry & Shayari</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
