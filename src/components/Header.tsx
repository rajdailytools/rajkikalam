import React, { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, Heart, Menu, X, Feather, ChevronDown } from 'lucide-react';
import { getFavorites, getInitialTheme, setPersistedTheme } from '../utils/storage';
import { BRAND_INFO } from '../data/content';
import { MAIN_NAV_MENUS } from '../data/navigation';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [savedCount, setSavedCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    }

    const updateFavs = () => {
      setSavedCount(getFavorites().length);
    };
    updateFavs();

    window.addEventListener('favorites-updated', updateFavs);
    return () => window.removeEventListener('favorites-updated', updateFavs);
  }, []);

  // Detect scroll for compact header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setPersistedTheme(next);
  };

  const handleMouseEnter = (menuId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleLinkClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const activeMenuObj = MAIN_NAV_MENUS.find(m => m.id === activeDropdown);

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#161311]/95 backdrop-blur-md border-b border-[#EADBCE] dark:border-[#2C241E] transition-all duration-200 ${
        isScrolled ? 'shadow-[0_2px_12px_rgba(40,25,10,0.06)]' : ''
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-200 ${
        isScrolled ? 'h-16' : 'h-20'
      }`}>
        
        {/* Brand Logo & Wordmark */}
        <button 
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-3 text-left group focus-visible:outline-none shrink-0"
          aria-label="Raj Ki Kalam Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFE7DC] dark:bg-[#28211B] border border-[#D5C4B0] dark:border-[#42372D] flex items-center justify-center text-[#8D6527] dark:text-[#D4AF37] group-hover:scale-105 transition-transform duration-200">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B211A] dark:text-[#F3ECE4] leading-tight">
              {BRAND_INFO.name}
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-widest text-[#7B6E63] dark:text-[#A89D92] font-semibold uppercase">
              {BRAND_INFO.tagline}
            </span>
          </div>
        </button>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
          {/* Home Link */}
          <button
            onClick={() => handleLinkClick('/')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none ${
              currentPath === '/'
                ? 'text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                : 'text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2]'
            }`}
          >
            Home
          </button>

          {/* Menus with Dropdowns */}
          {MAIN_NAV_MENUS.map((menu) => {
            const isActive = currentPath.startsWith(menu.path);
            const isOpen = activeDropdown === menu.id;

            return (
              <div 
                key={menu.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    if (isOpen) {
                      setActiveDropdown(null);
                    } else {
                      setActiveDropdown(menu.id);
                    }
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none ${
                    isActive || isOpen
                      ? 'text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2]'
                  }`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span>{menu.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}

          {/* Categories Link */}
          <button
            onClick={() => handleLinkClick('/categories/')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none ${
              currentPath === '/categories/'
                ? 'text-[#8D6527] dark:text-[#D4AF37] font-semibold'
                : 'text-[#4A3F37] dark:text-[#C5BDB5] hover:text-[#1F1713] dark:hover:text-[#FBF7F2]'
            }`}
          >
            Categories
          </button>
        </nav>

        {/* Right Action Icons: Search, Saved, Theme, Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-[#4A3F37] dark:text-[#C5BDB5] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
            aria-label="Search Shayari and Poetry"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Saved */}
          <button
            onClick={() => handleLinkClick('/saved/')}
            className="p-2 rounded-full relative text-[#4A3F37] dark:text-[#C5BDB5] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
            aria-label={`Saved items (${savedCount})`}
            title="Saved Shayari"
          >
            <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-[#A84A3B] fill-[#A84A3B]/20' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8D6527] dark:bg-[#D4AF37] text-white dark:text-[#161311] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {savedCount > 9 ? '9+' : savedCount}
              </span>
            )}
          </button>

          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[#4A3F37] dark:text-[#C5BDB5] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] hover:text-[#1F1713] dark:hover:text-[#FBF7F2] transition-colors"
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title="Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-[#E0B758]" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#4A3F37] dark:text-[#C5BDB5] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Dropdown Panel */}
      {activeMenuObj && (
        <div 
          className="hidden lg:block absolute left-0 right-0 top-full bg-[#FAF7F2] dark:bg-[#1A1512] border-b border-[#E3D6C5] dark:border-[#2C241E] shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
          onMouseEnter={() => handleMouseEnter(activeMenuObj.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-7">
            {/* Mega-menu Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EADBCE] dark:border-[#2C241E]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2A201A] dark:text-[#F3ECE4]">
                  {activeMenuObj.heading}
                </h3>
                <p className="text-xs text-[#7B6E63] dark:text-[#A89D92]">
                  {activeMenuObj.headingHi}
                </p>
              </div>
              <button
                onClick={() => handleLinkClick(activeMenuObj.bottomCta.path)}
                className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline flex items-center gap-1.5"
              >
                <span>{activeMenuObj.bottomCta.label}</span>
              </button>
            </div>

            {/* Columns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {activeMenuObj.columns.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8D6527] dark:text-[#D4AF37]">
                    {col.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item.path}>
                        <button
                          onClick={() => handleLinkClick(item.path)}
                          className="w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium text-[#382D24] dark:text-[#D9D0C5] hover:bg-[#F3EBE0] dark:hover:bg-[#261F1A] hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                        >
                          {item.icon && <span className="text-sm shrink-0">{item.icon}</span>}
                          <span className="truncate group-hover:translate-x-0.5 transition-transform">
                            {item.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Strip */}
            <div className="mt-6 pt-4 border-t border-[#EADBCE] dark:border-[#2C241E] flex items-center justify-between text-xs text-[#7B6E63] dark:text-[#A89D92]">
              <span>Curated with literary depth • Raj Ki Kalam</span>
              <button
                onClick={() => handleLinkClick(activeMenuObj.bottomCta.path)}
                className="font-semibold text-[#8D6527] dark:text-[#D4AF37] hover:underline"
              >
                {activeMenuObj.bottomCta.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Full-Height Mobile Drawer (Rendered via createPortal to document.body) */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        savedCount={savedCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </header>
  );
};
