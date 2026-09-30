import React, { useState } from 'react';
import { X, Check, Copy, Share2, Download, MessageCircle, Send, Globe } from 'lucide-react';
import { ContentItem } from '../types';
import { copyToClipboard, getShareUrls, shareViaNativeApi, canNativeShare } from '../utils/sharing';
import { downloadShayariCard } from '../utils/imageGenerator';

interface ShareModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ item, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!item) return null;

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/${item.categorySlug}/` : 'https://rajkikalam.in';
  const shareUrls = getShareUrls(item.text, item.title, currentUrl);

  const handleCopyText = async () => {
    const success = await copyToClipboard(`${item.text}\n\n— राज की कलम (RajKiKalam.in)`);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handleCopyInstagramCaption = async () => {
    const tagsFormatted = item.tags.map(t => `#${t.replace(/-/g, '')}`).join(' ');
    const caption = `${item.text}\n.\n.\n.\n— Raj Ki Kalam • Alfaaz • Ehsaas • Poetry\nWebsite: RajKiKalam.in\n${tagsFormatted} #RajKiKalam #HindiShayari #Poetry`;
    const success = await copyToClipboard(caption);
    if (success) {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    }
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    await downloadShayariCard(item.title, item.text, item.category, item.slug);
    setIsDownloading(false);
  };

  const handleNativeShare = async () => {
    await shareViaNativeApi({
      title: `${item.title} — Raj Ki Kalam`,
      text: `${item.text}\n\n— Via RajKiKalam.in`,
      url: currentUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E3D8CA] dark:border-[#332A23] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE1D4] dark:border-[#2C241E]">
          <div>
            <h3 id="share-modal-title" className="font-serif text-xl font-bold text-[#2A201A] dark:text-[#F3ECE4]">
              साझा करें • Share Alfaaz
            </h3>
            <p className="text-xs text-[#7B6E63] dark:text-[#A89D92]">
              {item.category} — {item.title}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7B6E63] dark:text-[#A89D92] hover:bg-[#EFE8DD] dark:hover:bg-[#2A231E] transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview */}
        <div className="px-6 py-4 bg-[#F5EDE1]/60 dark:bg-[#181412]/60 border-b border-[#EBE1D4] dark:border-[#2C241E]">
          <p className="text-sm font-hindi-poetry text-[#342A23] dark:text-[#E8E1D9] italic line-clamp-3 whitespace-pre-line leading-relaxed">
            "{item.text}"
          </p>
        </div>

        {/* Direct Sharing Channels */}
        <div className="p-6 space-y-6">
          {/* Quick Buttons: WhatsApp, Telegram, X, Facebook, Pinterest */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#7B6E63] dark:text-[#A89D92] mb-3">
              Direct Sharing
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {/* WhatsApp */}
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1E7E34] dark:text-[#32D768] border border-[#25D366]/20 transition-all text-center group"
              >
                <MessageCircle className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href={shareUrls.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#1E7AAB] dark:text-[#38B2EE] border border-[#229ED9]/20 transition-all text-center group"
              >
                <Send className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Telegram</span>
              </a>

              {/* X / Twitter */}
              <a
                href={shareUrls.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#2B211A] dark:text-[#F3ECE4] border border-[#E3D8CA] dark:border-[#382E26] transition-all text-center group"
              >
                <span className="w-5 h-5 mb-1 flex items-center justify-center font-bold text-sm">𝕏</span>
                <span className="text-[11px] font-medium">Post</span>
              </a>

              {/* Facebook */}
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#145CB8] dark:text-[#4293F7] border border-[#1877F2]/20 transition-all text-center group"
              >
                <Globe className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Facebook</span>
              </a>

              {/* Pinterest */}
              <a
                href={shareUrls.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#BD081C]/10 hover:bg-[#BD081C]/20 text-[#BD081C] dark:text-[#E02438] border border-[#BD081C]/20 transition-all text-center group"
              >
                <span className="w-5 h-5 mb-1 flex items-center justify-center font-bold text-sm">P</span>
                <span className="text-[11px] font-medium">Pinterest</span>
              </a>
            </div>
          </div>

          {/* Instagram Specific Flow */}
          <div className="p-4 rounded-xl bg-[#FAF0E4] dark:bg-[#251E19] border border-[#E4D3C0] dark:border-[#382B22]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                📸 Instagram & Story Workflow
              </span>
              <span className="text-[11px] text-[#7B6E63] dark:text-[#A89D92]">
                Post & Reels Ready
              </span>
            </div>
            <p className="text-xs text-[#5C4F45] dark:text-[#C5BDB5] mb-3 leading-relaxed">
              Instagram does not support direct web-text posting. Download the styled card graphic and copy the optimized caption with literary tags below:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopyInstagramCaption}
                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-[#1A1614] border border-[#D9C8B5] dark:border-[#42362C] text-[#2B211A] dark:text-[#F3ECE4] hover:bg-[#F3ECE1] dark:hover:bg-[#29221C] transition-colors"
              >
                {copiedCaption ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#8D6527]" />}
                {copiedCaption ? 'Caption Copied!' : 'Copy Caption'}
              </button>

              <button
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg bg-[#8D6527] text-white hover:bg-[#78541F] transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Generating...' : 'Download Card'}
              </button>
            </div>
          </div>

          {/* Native Web Share & Copy Link */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#EBE1D4] dark:border-[#2C241E]">
            <button
              onClick={handleCopyText}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#D5C5B2] dark:border-[#382E26] hover:bg-[#EFE8DD] dark:hover:bg-[#26201B] text-sm font-medium text-[#2B211A] dark:text-[#F3ECE4] transition-colors"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedText ? 'Shayari Copied!' : 'Copy Shayari Text'}
            </button>

            {canNativeShare() && (
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Device Share
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
