import React, { useState } from 'react';
import { Download, Share2, Feather, Check } from 'lucide-react';
import { ContentItem } from '../types';
import { downloadShayariCard } from '../utils/imageGenerator';

interface PoetryImageCardProps {
  item: ContentItem;
  onOpenShare: (item: ContentItem) => void;
}

export const PoetryImageCard: React.FC<PoetryImageCardProps> = ({ item, onOpenShare }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const success = await downloadShayariCard(item.title, item.text, item.category, item.slug);
    setDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-[#DECDBB] dark:border-[#382D24] bg-white dark:bg-[#1C1714] shadow-[0_4px_16px_rgba(40,25,10,0.04)] group">
      
      {/* Visual Literary Card Simulation */}
      <div className="relative aspect-square sm:aspect-4/3 p-6 sm:p-8 flex flex-col justify-between bg-radial from-[#FDFBF7] via-[#F7EFE4] to-[#ECE1D1] dark:from-[#241D18] dark:via-[#1F1915] dark:to-[#17120F] border-b border-[#E8DACB] dark:border-[#2F251E]">
        
        {/* Subtle Ornamental Frame */}
        <div className="absolute inset-3 border border-[#C5A880]/30 rounded-xl pointer-events-none" />

        {/* Top Watermark & Category */}
        <div className="flex items-center justify-between text-[11px] font-medium tracking-widest uppercase text-[#9B7238] dark:text-[#D4AF37]">
          <span>{item.category}</span>
          <span className="flex items-center gap-1 opacity-80">
            <Feather className="w-3 h-3" />
            Raj Ki Kalam
          </span>
        </div>

        {/* Center Stanza */}
        <div className="my-auto py-4 text-center">
          <p className="font-hindi-poetry text-lg sm:text-xl md:text-2xl text-[#261C16] dark:text-[#FAF5EE] whitespace-pre-line leading-relaxed font-medium">
            "{item.text}"
          </p>
        </div>

        {/* Bottom Brand Stamp */}
        <div className="text-center pt-2 border-t border-[#DECBB8]/50 dark:border-[#382B21]/50">
          <span className="font-serif text-sm font-semibold tracking-wide text-[#34271F] dark:text-[#D8CFBF]">
            राज की कलम • Alfaaz • Ehsaas • Poetry
          </span>
          <span className="block text-[10px] text-[#7E7063] dark:text-[#9B8F83]">
            RajKiKalam.in
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-[#FAF7F2] dark:bg-[#1E1915] flex items-center justify-between gap-3">
        <div className="text-xs text-[#7B6E63] dark:text-[#A89D92] truncate">
          {item.title}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenShare(item)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#D5C2AD] dark:border-[#3E3126] text-xs font-medium text-[#2E241E] dark:text-[#F0E9DF] hover:bg-[#EFE8DC] dark:hover:bg-[#28211B] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-medium transition-colors disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? 'Exporting...' : 'Download Image'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
