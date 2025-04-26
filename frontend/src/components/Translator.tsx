import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../config';
import './Translator.css';

interface Language {
  code: string;
  name: string;
}

const Translator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get available languages for translation from translations
  const translationLanguages: Language[] = Object.entries(t('languages', { returnObjects: true })).map(([code, name]) => ({
    code,
    name: name as string,
  }));

  // Get available languages for app interface from translations
  const appLanguages: Language[] = Object.entries(t('languages', { returnObjects: true })).map(([code, name]) => ({
    code,
    name: name as string,
  }));

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError(t('translator.error.emptyText'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(t('translator.error.translationFailed'));
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('translator.error.generic'));
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
  };

  const handleSwapLanguages = () => {
    // Swap the source and target languages
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    // Also swap the text if there's any
    if (sourceText && translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const handleReset = () => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  };

  return (
    <div className="translator-container">
      <h1 className="translator-heading">{t('app.title')}</h1>
      
      <div className="language-selectors">
        <div className="language-selector">
          <label htmlFor="sourceLanguage">{t('translator.from')}:</label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {translationLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="swap-button" 
          onClick={handleSwapLanguages}
          aria-label={t('translator.swapLanguages')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 8l-4 4 4 4M17 8l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="language-selector">
          <label htmlFor="targetLanguage">{t('translator.to')}:</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {translationLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="translation-boxes">
        <div className="translation-box">
          <label htmlFor="sourceText">{t('translator.enterText')}:</label>
          <textarea
            id="sourceText"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={t('translator.enterText')}
          />
        </div>

        <div className="translation-box">
          <label htmlFor="translatedText">{t('translator.translation')}:</label>
          <textarea
            id="translatedText"
            value={translatedText}
            readOnly
            placeholder={t('translator.translation')}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-group">
        <button
          className="translate-button"
          onClick={handleTranslate}
          disabled={isLoading || !sourceText.trim()}
        >
          {isLoading ? t('translator.translating') : t('translator.translate')}
        </button>

        <button
          className="reset-button"
          onClick={handleReset}
          disabled={isLoading || (!sourceText.trim() && !translatedText.trim())}
        >
          {t('translator.reset')}
        </button>
      </div>

      <div className="app-language-selector">
        <label htmlFor="appLanguage">{t('app.language')}:</label>
        <select
          id="appLanguage"
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          {appLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Translator; 