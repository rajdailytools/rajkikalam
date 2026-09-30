import React from 'react';
import { Feather, ArrowLeft, BookOpen } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 text-center max-w-xl mx-auto px-4 space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#EFE7DC] dark:bg-[#28201A] border border-[#DFCBB5] dark:border-[#3E3228] mx-auto flex items-center justify-center text-[#8D6527] dark:text-[#D4AF37]">
        <Feather className="w-8 h-8" />
      </div>

      <span className="font-serif text-6xl sm:text-7xl font-bold text-[#8D6527] dark:text-[#D4AF37] block">
        404
      </span>

      <h1 className="font-serif text-3xl font-bold text-[#281F1A] dark:text-[#FAF5EE]">
        These alfaaz seem to have gone missing.
      </h1>

      <p className="font-hindi-poetry text-lg text-[#6B5C51] dark:text-[#B6ACA2]">
        ये अल्फ़ाज़ शायद पन्नों के बीच कहीं खो गए हैं।
      </p>

      <p className="text-xs text-[#7B6E63] dark:text-[#9F9387] max-w-md mx-auto">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us guide you back to our poetry anthology.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 py-3 px-6 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Home (मुखपृष्ठ)</span>
        </button>

        <button
          onClick={() => onNavigate('/hindi-shayari/')}
          className="flex items-center gap-2 py-3 px-6 rounded-xl border border-[#D5C2AD] dark:border-[#382E26] bg-[#FAF7F2] dark:bg-[#201A16] hover:bg-[#EFE8DD] dark:hover:bg-[#2A221C] text-xs font-semibold text-[#281F1A] dark:text-[#F3ECE4] transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore Shayari (शायरी देखें)</span>
        </button>
      </div>
    </div>
  );
};
