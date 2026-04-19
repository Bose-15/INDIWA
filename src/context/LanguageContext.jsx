import React, { createContext, useContext, useState } from 'react';
import { translations } from '../locales/translations';

// ─── Supported languages (add Phase-2 entries here when translations are ready)
export const LANGUAGES = [
  { code: 'en', label: 'English',   nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil',     nativeLabel: 'தமிழ்'  },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'hi', label: 'Hindi',     nativeLabel: 'हिन्दी'  },
  { code: 'te', label: 'Telugu',    nativeLabel: 'తెలుగు' },
  { code: 'kn', label: 'Kannada',   nativeLabel: 'ಕನ್ನಡ'  },
];

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('indiwa-lang') || 'en'; }
    catch { return 'en'; }
  });

  const switchLang = (code) => {
    setLang(code);
    try { localStorage.setItem('indiwa-lang', code); } catch {}
  };

  /** Translate a key; falls back to English, then to the key itself. */
  const t = (key) => {
    const dict = translations[lang] || translations['en'];
    return dict?.[key] ?? translations['en']?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};

export default LanguageContext;
