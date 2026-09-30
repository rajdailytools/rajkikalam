export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return false;
  }
}

export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

export async function shareViaNativeApi(data: { title: string; text: string; url: string }): Promise<boolean> {
  if (canNativeShare()) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      // User cancelled or aborted sharing
      if ((err as Error).name !== 'AbortError') {
        console.error("Native share error:", err);
      }
      return false;
    }
  }
  return false;
}

export function getShareUrls(text: string, title: string, pageUrl: string) {
  const brandSuffix = "\n\n— Raj Ki Kalam (https://rajkikalam.in)";
  const fullText = text + brandSuffix;
  const encodedFullText = encodeURIComponent(fullText);
  const encodedUrl = encodeURIComponent(pageUrl || "https://rajkikalam.in");
  const encodedShortText = encodeURIComponent(text.slice(0, 180) + "...\n");

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedFullText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShortText}`,
    x: `https://twitter.com/intent/tweet?text=${encodedShortText}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(text.slice(0, 250))}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodeURIComponent(text.slice(0, 300))}`
  };
}
