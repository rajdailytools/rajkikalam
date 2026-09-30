import React, { useState } from 'react';
import { Copy, Check, Share2, Heart, Download } from 'lucide-react';
import { ContentItem } from '../types';
import { copyToClipboard } from '../utils/sharing';
import { isFavorite, toggleFavorite } from '../utils/storage';
import { downloadShayariCard } from '../utils/imageGenerator';

interface FeaturedShayariProps {
  item: ContentItem;
  onOpenShare: (item: ContentItem) => void;
  onSelectCategory?: (slug: string) => void;
}

export const FeaturedShayari: React.FC<FeaturedShayariProps> = ({ item, onOpenShare, onSelectCategory }) => {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(() => isFavorite(item.id));
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `${item.text}\n\n— Via RajKiKalam.in (${item.category})`;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFavorite = () => {
    const next = toggleFavorite(item.id);
    setFavorite(next);
  };

  const handleDownload = async () => {
    setDownloading(true);
    await downloadShayariCard(item.title, item.text, item.category, item.slug);
    setDownloading(false);
  };

  const isHindi = item.language === 'hi';

  return (
    <div className="relative rounded-3xl bg-linear-to-b from-[#FBF6EE] to-[#F5ECE0] dark:from-[#221B17] dark:to-[#1A1411] border border-[#DFCBB5] dark:border-[#3E3126] p-8 sm:p-12 shadow-sm overflow-hidden">
      
      {/* Decorative literary watermark */}
      <div 
        aria-hidden="true" 
        className="absolute top-4 right-8 font-serif text-8xl sm:text-9xl text-[#8D6527]/10 dark:text-[#D4AF37]/5 select-none pointer-events-none"
      >
        “
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Kicker label without pill */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D6527] dark:text-[#D4AF37] mb-4">
          <span>FEATURED POETRY</span>
          <span aria-hidden="true">·</span>
          {onSelectCategory ? (
            <button 
              onClick={() => onSelectCategory(item.categorySlug)}
              className="hover:underline focus-visible:outline-none"
            >
              {item.category}
            </button>
          ) : (
            <span>{item.category}</span>
          )}
        </div>

        {/* Stanza */}
        <p className={`whitespace-pre-line text-[#211813] dark:text-[#F6EFE8] leading-relaxed mb-6 ${
          isHindi 
            ? 'font-hindi-poetry text-2xl sm:text-3xl font-medium' 
            : 'font-serif text-2xl sm:text-3xl italic'
        }`}>
          "{item.text}"
        </p>

        {/* Attribution & Notice */}
        <div className="flex items-center gap-3 text-xs text-[#7B6E63] dark:text-[#A89D92] mb-8">
          <span className="font-medium">— {item.author}</span>
          <span aria-hidden="true">·</span>
          <span>{item.readTime} read</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 py-2 px-4 rounded-xl border border-[#D5C2AD] dark:border-[#423429] bg-white dark:bg-[#28201B] hover:bg-[#F3EBE0] dark:hover:bg-[#322822] text-sm font-medium text-[#281F1A] dark:text-[#F3ECE4] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Shayari'}</span>
          </button>

          <button
            onClick={() => onOpenShare(item)}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-sm font-medium transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 py-2 px-4 rounded-xl border border-[#D5C2AD] dark:border-[#423429] bg-white dark:bg-[#28201B] hover:bg-[#F3EBE0] dark:hover:bg-[#322822] text-sm font-medium text-[#281F1A] dark:text-[#F3ECE4] transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Exporting...' : 'Save as Image'}</span>
          </button>

          <button
            onClick={handleFavorite}
            className="p-2.5 rounded-xl border border-[#D5C2AD] dark:border-[#423429] bg-white dark:bg-[#28201B] hover:bg-[#F3EBE0] dark:hover:bg-[#322822] text-[#7B6E63] dark:text-[#A89D92] transition-colors"
            aria-label={favorite ? 'Remove from saved' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'text-[#B84030] fill-[#B84030]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
