import React, { useState } from 'react';
import { Mail, CheckCircle2, Feather } from 'lucide-react';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setStatus('error');
      setErrorMessage('कृपया अपना ईमेल पता दर्ज करें (Please enter your email address).');
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setStatus('error');
      setErrorMessage('कृपया एक वैध ईमेल पता दर्ज करें (Please enter a valid email address).');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-12">
      <div className="relative rounded-3xl bg-linear-to-r from-[#F7EFE4] via-[#F4ECE0] to-[#EFE5D5] dark:from-[#211A16] dark:via-[#1D1713] dark:to-[#17120F] border border-[#DFCBB5] dark:border-[#382D24] p-8 sm:p-12 text-center overflow-hidden">
        
        {/* Subtle literary background icon */}
        <div 
          aria-hidden="true" 
          className="absolute -bottom-8 -right-8 w-44 h-44 text-[#8D6527]/5 dark:text-[#D4AF37]/5 pointer-events-none select-none flex items-center justify-center"
        >
          <Feather className="w-full h-full" />
        </div>

        <div className="max-w-xl mx-auto relative z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8D6527] dark:text-[#D4AF37] mb-2 block">
            रूहानी पैगाम • LITERARY DISPATCH
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A201A] dark:text-[#F3ECE4] mb-3">
            Get new Shayari & Poetry in your inbox.
          </h3>
          <p className="text-sm text-[#6C5F54] dark:text-[#B6ACA2] mb-6 leading-relaxed">
            ताज़ा शायरी, नज़्में और अहसास भरी कविताएं सीधे अपने इनबॉक्स में पाएं। कोई स्पैम नहीं, केवल दिल को छू लेने वाले अल्फ़ाज़।
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-2 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>धन्यवाद! आप सफलतापूर्वक जुड़ चुके हैं। (Thank you for subscribing!)</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7D72] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#28211B] border border-[#D5C2AD] dark:border-[#42362C] text-sm text-[#281F1A] dark:text-[#F3ECE4] placeholder-[#8A7D72] focus:outline-none focus:ring-2 focus:ring-[#8D6527] dark:focus:ring-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="py-3 px-6 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 text-left sm:text-center">
              {errorMessage}
            </p>
          )}

          <p className="mt-3 text-[11px] text-[#8C7E72] dark:text-[#9A8D81]">
            We respect your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};
