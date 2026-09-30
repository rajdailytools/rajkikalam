import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Feather, ChevronDown, ArrowRight, Heart, Search, Moon, Sun } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { MAIN_NAV_MENUS } from '../data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  savedCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
  onOpenSearch,
  savedCount,
  theme,
  onToggleTheme,
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset accordions when closed or when route changes
  useEffect(() => {
    if (!isOpen) {
      setExpandedAccordion(null);
    }
  }, [isOpen]);

  if (!mounted || !isOpen || typeof document === 'undefined') {
    return null;
  }

  const handleLinkClick = (path: string) => {
    onClose();
    onNavigate(path);
  };

  const toggleAccordion = (id: string) => {
    setExpandedAccordion((prev) => (prev === id ? null : id));
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Backdrop with fade in */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ease-out z-[99990]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container anchored directly to viewport */}
      <div
        className="relative w-[85vw] max-w-sm sm:max-w-md h-[100dvh] bg-[#FAF7F2] dark:bg-[#1A1512] shadow-2xl flex flex-col z-[99995] border-l border-[#EADBCE] dark:border-[#2C241E] overflow-hidden animate-in slide-in-from-right duration-250 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EADBCE] dark:border-[#2C241E] flex items-center justify-between shrink-0 bg-[#F6EFE5]/90 dark:bg-[#161210]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EFE7DC] dark:bg-[#28211B] border border-[#D5C4B0] dark:border-[#42372D] flex items-center justify-center text-[#8D6527] dark:text-[#D4AF37]">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#2B211A] dark:text-[#F3ECE4] leading-tight block">
                {BRAND_INFO.name}
              </span>
              <span className="text-[9px] tracking-widest text-[#7B6E63] dark:text-[#A89D92] font-semibold uppercase block">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6E6156] dark:text-[#A89D92] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] hover:text-[#281F1A] dark:hover:text-[#FAF5EE] transition-colors focus-visible:outline-none"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Actions Row: Search, Saved, Theme */}
        <div className="px-4 py-3 bg-[#EFE8DD]/50 dark:bg-[#221B17]/60 border-b border-[#EADBCE] dark:border-[#2C241E] flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-[#FAF7F2] dark:bg-[#1A1512] border border-[#DED0C1] dark:border-[#382E26] text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>

          <button
            onClick={() => handleLinkClick('/saved/')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-[#FAF7F2] dark:bg-[#1A1512] border border-[#DED0C1] dark:border-[#382E26] text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-[#A84A3B] fill-[#A84A3B]/20' : ''}`} />
            <span>Saved ({savedCount})</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center py-2 px-3 rounded-lg text-xs font-medium bg-[#FAF7F2] dark:bg-[#1A1512] border border-[#DED0C1] dark:border-[#382E26] text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
            title="Toggle Theme"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-[#E0B758]" />}
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {/* Home Link */}
          <button
            onClick={() => handleLinkClick('/')}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-between ${
              currentPath === '/'
                ? 'bg-[#EAE0D3] dark:bg-[#2F2620] text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                : 'text-[#2B211A] dark:text-[#F3ECE4] hover:bg-[#F3EBE0] dark:hover:bg-[#251E19]'
            }`}
          >
            <span>Home (मुखपृष्ठ)</span>
            {currentPath === '/' && <span className="w-1.5 h-1.5 rounded-full bg-[#8D6527] dark:bg-[#D4AF37]" />}
          </button>

          {/* Accordion Categories */}
          {MAIN_NAV_MENUS.map((menu) => {
            const isExpanded = expandedAccordion === menu.id;
            const isActive = currentPath.startsWith(menu.path);
            const allItems = menu.columns.flatMap((col) => col.items);

            return (
              <div
                key={menu.id}
                className="rounded-xl border border-[#E9DFD2] dark:border-[#2E251E] bg-[#FDFBF7] dark:bg-[#1D1815] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(menu.id)}
                  className={`w-full flex items-center justify-between py-2.5 px-3.5 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#8D6527] dark:text-[#D4AF37]'
                      : 'text-[#2B211A] dark:text-[#F3ECE4]'
                  } hover:bg-[#F3EBE0] dark:hover:bg-[#251E19]`}
                  aria-expanded={isExpanded}
                >
                  <span className="flex items-center gap-2">
                    {menu.label}
                    <span className="text-[11px] font-normal text-[#86786D] dark:text-[#9F9387]">
                      ({menu.labelHi})
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8D6527] dark:text-[#D4AF37] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Submenu Drawer Content */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#EFE5D8] dark:border-[#2A211B] space-y-1 bg-[#FAF6EE] dark:bg-[#191411]">
                    <div className="grid grid-cols-1 gap-0.5">
                      {allItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleLinkClick(item.path)}
                          className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-between group transition-colors ${
                            currentPath === item.path
                              ? 'bg-[#EAE0D3] dark:bg-[#2F2620] text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                              : 'text-[#4A3D34] dark:text-[#C5BCB3] hover:text-[#8D6527] dark:hover:text-[#D4AF37] hover:bg-[#F0E6D8] dark:hover:bg-[#241D18]'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            {item.icon && <span className="text-sm shrink-0">{item.icon}</span>}
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="text-[10px] text-[#A39587] dark:text-[#786C61] group-hover:translate-x-0.5 transition-transform">
                            →
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Bottom CTA for full category explore */}
                    <div className="pt-2 mt-1 border-t border-[#EFE5D8] dark:border-[#2A211B]">
                      <button
                        onClick={() => handleLinkClick(menu.bottomCta.path)}
                        className="w-full text-left py-1.5 px-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center justify-between"
                      >
                        <span>{menu.bottomCta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Categories Link */}
          <button
            onClick={() => handleLinkClick('/categories/')}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-between ${
              currentPath === '/categories/'
                ? 'bg-[#EAE0D3] dark:bg-[#2F2620] text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                : 'text-[#2B211A] dark:text-[#F3ECE4] hover:bg-[#F3EBE0] dark:hover:bg-[#251E19]'
            }`}
          >
            <span>Categories (सभी श्रेणियाँ)</span>
            <ArrowRight className="w-4 h-4 text-[#8D6527] dark:text-[#D4AF37]" />
          </button>

          {/* Saved Items Link */}
          <button
            onClick={() => handleLinkClick('/saved/')}
            className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl font-medium text-sm text-[#2B211A] dark:text-[#F3ECE4] bg-[#F3EBE0]/80 dark:bg-[#251E19] border border-[#E0D1BF] dark:border-[#382D24] hover:bg-[#EAE0D3] dark:hover:bg-[#2F2620] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#A84A3B] fill-[#A84A3B]/20" />
              <span>Saved Words (सहेजे गए अल्फ़ाज़)</span>
            </span>
            <span className="bg-[#8D6527] text-white dark:bg-[#D4AF37] dark:text-[#161311] px-2 py-0.5 rounded-full text-[10px] font-bold">
              {savedCount}
            </span>
          </button>

          {/* Brand & Editorial / Legal Section */}
          <div className="pt-4 mt-2 border-t border-[#EADBCE] dark:border-[#2C241E] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37] block px-3 mb-2">
              Brand & Legal
            </span>
            {[
              { label: 'About Us (परिचय)', path: '/about/' },
              { label: 'Contact Us (संपर्क)', path: '/contact/' },
              { label: 'Privacy Policy (गोपनीयता)', path: '/privacy-policy/' },
              { label: 'Disclaimer (अस्वीकरण)', path: '/disclaimer/' },
              { label: 'Terms & Conditions (नियम व शर्तें)', path: '/terms-and-conditions/' },
              { label: 'Copyright Policy (कॉपीराइट)', path: '/copyright/' },
              { label: 'Advertising Policy (विज्ञापन)', path: '/advertising-policy/' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`w-full text-left py-1.5 px-3 text-xs rounded-lg transition-colors ${
                  currentPath === link.path
                    ? 'text-[#8D6527] dark:text-[#D4AF37] font-semibold bg-[#EFE8DD] dark:bg-[#26201B]'
                    : 'text-[#6F6156] dark:text-[#A89D92] hover:text-[#281F1A] dark:hover:text-[#F3ECE4] hover:bg-[#F3EBE0]/60 dark:hover:bg-[#221B17]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Footer with author info */}
        <div className="p-4 border-t border-[#EADBCE] dark:border-[#2C241E] text-[11px] text-[#7B6E63] dark:text-[#A89D92] shrink-0 bg-[#F6EFE5] dark:bg-[#161210]">
          <div className="flex items-center justify-between mb-1">
            <span>Author:</span>
            <span className="font-semibold text-[#281F1A] dark:text-[#F3ECE4]">{BRAND_INFO.author}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Contact:</span>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="text-[#8D6527] dark:text-[#D4AF37] hover:underline"
            >
              {BRAND_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
