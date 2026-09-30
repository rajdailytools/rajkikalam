import React, { useState } from 'react';
import { Copy, Check, Share2, Heart, Download } from 'lucide-react';
import { ContentItem } from '../types';
import { copyToClipboard } from '../utils/sharing';
import { isFavorite, toggleFavorite } from '../utils/storage';
import { downloadShayariCard } from '../utils/imageGenerator';

interface ShayariCardProps {
  item: ContentItem;
  index?: number;
  onOpenShare: (item: ContentItem) => void;
  onSelectCategory?: (slug: string) => void;
}

export const ShayariCard: React.FC<ShayariCardProps> = ({ item, index, onOpenShare, onSelectCategory }) => {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(() => isFavorite(item.id));
  const [downloading, setDownloading] = useState(false);

  const formattedIndex = index !== undefined ? String(index + 1).padStart(2, '0') : undefined;

  const handleCopy = async () => {
    const textToCopy = `${item.text}\n\n— Via RajKiKalam.in (${item.category})`;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFavoriteToggle = () => {
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
    <article className="group relative bg-[#FDFCFA] dark:bg-[#1E1916] border border-[#E9E0D4] dark:border-[#332A23] rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(40,25,10,0.03)] hover:shadow-[0_8px_20px_rgba(40,25,10,0.06)] hover:border-[#D5C2AD] dark:hover:border-[#4D3F33] transition-all duration-200 flex flex-col justify-between">
      
      {/* Top Header: Index & Unboxed Metadata */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F0E8DD] dark:border-[#2C241E]">
        <div className="flex items-center gap-2 text-xs text-[#7B6E63] dark:text-[#A89D92]">
          {formattedIndex && (
            <span className="font-serif font-bold text-sm text-[#8D6527] dark:text-[#D4AF37]">
              {formattedIndex}
            </span>
          )}
          {formattedIndex && <span aria-hidden="true">·</span>}
          {onSelectCategory ? (
            <button
              onClick={() => onSelectCategory(item.categorySlug)}
              className="hover:text-[#8D6527] dark:hover:text-[#D4AF37] transition-colors focus-visible:outline-none"
            >
              {item.category}
            </button>
          ) : (
            <span>{item.category}</span>
          )}
          <span aria-hidden="true">·</span>
          <span>{item.readTime}</span>
        </div>

        {/* Save / Favorite Heart */}
        <button
          onClick={handleFavoriteToggle}
          className="p-1.5 rounded-full text-[#7B6E63] dark:text-[#A89D92] hover:bg-[#F3EBE0] dark:hover:bg-[#28211B] transition-colors"
          aria-label={favorite ? 'Remove from saved' : 'Save to favorites'}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              favorite ? 'text-[#B84030] fill-[#B84030]' : 'hover:text-[#B84030]'
            }`} 
          />
        </button>
      </div>

      {/* Main Stanza / Verse Content */}
      <div className="my-2">
        <h3 className="sr-only">{item.title}</h3>
        <p className={`whitespace-pre-line text-[#281F1A] dark:text-[#F1ECE5] leading-relaxed select-text ${
          isHindi 
            ? 'font-hindi-poetry text-lg sm:text-xl font-normal' 
            : 'font-serif text-lg sm:text-xl italic font-normal tracking-wide'
        }`}>
          {item.text}
        </p>
      </div>

      {/* Footer: Attribution / Demo Notice & Action Bar */}
      <div className="mt-6 pt-4 border-t border-[#F0E8DD] dark:border-[#2C241E] flex flex-wrap items-center justify-between gap-3">
        {/* Subtle Author / Demo Notice */}
        <div className="text-[11px] text-[#8C7F74] dark:text-[#9E9287]">
          {item.isDemo ? (
            <span title="The owner will replace demo content with their original poetry">
              — {item.author}
            </span>
          ) : (
            <span>— {item.author}</span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download Image Card */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="p-2 rounded-lg text-[#7B6E63] dark:text-[#A89D92] hover:bg-[#F3EBE0] dark:hover:bg-[#2A221C] hover:text-[#281F1A] dark:hover:text-[#F3ECE4] transition-colors focus-visible:outline-none"
            aria-label="Download poetry card image"
            title="Download Card Image"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-[#E4D7C7] dark:border-[#382E26] hover:bg-[#F3EBE0] dark:hover:bg-[#2A221C] text-xs font-medium text-[#281F1A] dark:text-[#F3ECE4] transition-colors focus-visible:outline-none"
            aria-label="Copy Shayari text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'कॉपी हुआ' : 'Copy'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => onOpenShare(item)}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-medium transition-colors focus-visible:outline-none"
            aria-label="Share options"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};
