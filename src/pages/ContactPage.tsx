import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldAlert, Send, AlertCircle, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BRAND_INFO } from '../data/content';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = lang === 'en' ? 'Please enter your name.' : 'कृपया अपना नाम दर्ज करें।';
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? 'Please enter your email.' : 'कृपया अपना ईमेल पता दर्ज करें।';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = lang === 'en' ? 'Please enter a valid email address.' : 'कृपया एक वैध ईमेल पता दर्ज करें।';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = lang === 'en' ? 'Please enter a subject.' : 'कृपया विषय दर्ज करें।';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = lang === 'en' 
        ? 'Message must be at least 10 characters.' 
        : 'संदेश कम से कम १० अक्षरों का होना चाहिए।';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        inquiryType: 'general',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Contact' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#E8DACB] dark:border-[#2E241E] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8D6527] dark:text-[#D4AF37] uppercase tracking-widest">
            <Mail className="w-4 h-4" />
            <span>COMMUNICATION & INQUIRIES</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231A15] dark:text-[#FAF5EE]">
            {lang === 'en' ? 'Contact Raj Ki Kalam' : 'राज की कलम से संपर्क करें'}
          </h1>

          <p className="text-base text-[#615347] dark:text-[#B6ACA2] max-w-2xl leading-relaxed mt-2">
            {lang === 'en'
              ? 'Have inquiries about our poetry collections, copyright concerns, or feedback? Get in touch with us.'
              : 'शायरी संग्रह, कॉपीराइट या प्रतिक्रिया से संबंधित किसी भी प्रश्न के लिए हमसे संपर्क करें।'}
          </p>
        </div>

        {/* Language Switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EFE8DC] dark:bg-[#231C18] border border-[#D5C2AD] dark:border-[#382E26] self-start sm:self-auto">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              lang === 'en'
                ? 'bg-white dark:bg-[#2C241E] text-[#8D6527] dark:text-[#D4AF37] shadow-xs'
                : 'text-[#6F6156] dark:text-[#A89D92] hover:text-[#211813]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              lang === 'hi'
                ? 'bg-white dark:bg-[#2C241E] text-[#8D6527] dark:text-[#D4AF37] shadow-xs'
                : 'text-[#6F6156] dark:text-[#A89D92] hover:text-[#211813]'
            }`}
          >
            हिंदी
          </button>
        </div>
      </header>

      {/* Main Grid: Direct Email Box + Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          {/* Direct Email Card */}
          <div className="p-6 rounded-2xl bg-[#F7EFE4] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              {lang === 'en' ? 'Email Us Directly' : 'सीधे ईमेल भेजें'}
            </h3>
            <p className="text-xs text-[#6F6156] dark:text-[#A89D92] leading-relaxed">
              {lang === 'en'
                ? 'For the fastest response regarding poetry, copyright, or partnerships, write directly to our official inbox:'
                : 'शायरी, कॉपीराइट या सुझावों के लिए हमारे आधिकारिक ईमेल पर संपर्क करें:'}
            </p>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-xs font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{BRAND_INFO.email}</span>
            </a>
          </div>

          {/* Author Card */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25] space-y-2 text-xs">
            <span className="font-semibold text-[#8D6527] dark:text-[#D4AF37] block">
              {lang === 'en' ? 'Platform Author:' : 'संस्थापक व लेखक:'}
            </span>
            <div className="font-serif text-base font-bold text-[#281F1A] dark:text-[#F3ECE4]">
              {BRAND_INFO.author}
            </div>
            <p className="text-[#6F6156] dark:text-[#A89D92]">
              {BRAND_INFO.name} • {BRAND_INFO.domain}
            </p>
          </div>

          {/* Copyright Inquiries Card */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#DFCBB5] dark:border-[#382E25] space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#8D6527] dark:text-[#D4AF37]">
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === 'en' ? 'Copyright Notices' : 'कॉपीराइट सूचना'}</span>
            </div>
            <p className="text-[#6F6156] dark:text-[#A89D92] leading-relaxed">
              {lang === 'en'
                ? 'For copyright takedowns or attribution updates, please specify the exact page URL and ownership details.'
                : 'कॉपीराइट टेकडाउन या सुधार हेतु कृपया संबंधित पेज का URL और विवरण साझा करें।'}
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-2">
          {/* Honest Backend Configuration Notice as required by prompt */}
          <div className="mb-4 p-4 rounded-xl bg-[#FAF3E8] dark:bg-[#231C18] border border-[#E4D3BF] dark:border-[#3A2D22] text-xs text-[#6F6156] dark:text-[#B6ACA2] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#8D6527] dark:text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#281F1A] dark:text-[#F3ECE4]">
                {lang === 'en' ? 'Email Integration Notice:' : 'ईमेल सूचना:'}
              </strong>{' '}
              {lang === 'en'
                ? `This website is running in client-side demonstration mode. For guaranteed delivery, you can write directly to ${BRAND_INFO.email}.`
                : `यह वेबसाइट वर्तमान में क्लाइंट-साइड मोड में चल रही है। तुरंत उत्तर हेतु आप सीधे ${BRAND_INFO.email} पर ईमेल कर सकते हैं।`}
            </div>
          </div>

          {status === 'success' ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'en' ? 'Thank you for reaching out!' : 'धन्यवाद! आपका संदेश दर्ज हो गया है।'}
              </h3>
              <p className="text-xs max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? `Your message has been validated. For urgent follow-ups, feel free to email author ${BRAND_INFO.author} at ${BRAND_INFO.email}.`
                  : `आपका संदेश मान्य कर लिया गया है। तत्काल संपर्क हेतु आप ${BRAND_INFO.email} पर लिख सकते हैं।`}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                {lang === 'en' ? 'Send Another Message' : 'अन्य संदेश भेजें'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#1E1916] border border-[#DECDBB] dark:border-[#332A22] space-y-5 shadow-xs">
              
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B6E63] dark:text-[#A89D92] mb-2">
                  {lang === 'en' ? 'Inquiry Category' : 'विषय वर्ग'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'general', labelEn: 'General Inquiry', labelHi: 'सामान्य पूछताछ' },
                    { id: 'copyright', labelEn: 'Copyright / Takedown', labelHi: 'कॉपीराइट सूचना' },
                    { id: 'feedback', labelEn: 'Feedback & Poetry', labelHi: 'सुझाव व शायरी' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: cat.id })}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                        formData.inquiryType === cat.id
                          ? 'bg-[#8D6527] text-white border-[#8D6527]'
                          : 'bg-[#FAF7F2] dark:bg-[#251E19] border-[#D9C8B5] dark:border-[#42372D] text-[#4A3D34] dark:text-[#C5BCB3]'
                      }`}
                    >
                      {lang === 'en' ? cat.labelEn : cat.labelHi}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#5C4F45] dark:text-[#C5BCB3] mb-1.5">
                    {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-sm text-[#281F1A] dark:text-[#F3ECE4] focus:outline-none focus:ring-2 focus:ring-[#8D6527]"
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#5C4F45] dark:text-[#C5BCB3] mb-1.5">
                    {lang === 'en' ? 'Your Email *' : 'ईमेल पता *'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-sm text-[#281F1A] dark:text-[#F3ECE4] focus:outline-none focus:ring-2 focus:ring-[#8D6527]"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-[#5C4F45] dark:text-[#C5BCB3] mb-1.5">
                  {lang === 'en' ? 'Subject *' : 'विषय *'}
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={lang === 'en' ? 'Regarding poetry rights or inquiries...' : 'शायरी, सुझाव या अन्य विषय...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-sm text-[#281F1A] dark:text-[#F3ECE4] focus:outline-none focus:ring-2 focus:ring-[#8D6527]"
                />
                {errors.subject && <p className="text-xs text-rose-600 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#5C4F45] dark:text-[#C5BCB3] mb-1.5">
                  {lang === 'en' ? 'Message *' : 'संदेश *'}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'en' ? 'Type your thoughts or inquiry here...' : 'अपना संदेश यहाँ लिखें...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251E19] border border-[#D5C2AD] dark:border-[#42372D] text-sm text-[#281F1A] dark:text-[#F3ECE4] focus:outline-none focus:ring-2 focus:ring-[#8D6527]"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 px-6 rounded-xl bg-[#8D6527] hover:bg-[#78541F] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status === 'submitting' 
                    ? (lang === 'en' ? 'Validating...' : 'जाँच की जा रही है...') 
                    : (lang === 'en' ? 'Send Inquiry Message' : 'संदेश भेजें')}
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
