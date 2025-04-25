import React, { useState } from 'react';
import './Translator.css';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'my', name: 'Burmese' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'tl', name: 'Filipino/Tagalog' },
  { code: 'ga', name: 'Irish (Gaeilge)' },
  { code: 'cy', name: 'Welsh (Cymraeg)' },
  { code: 'gd', name: 'Scottish Gaelic' },
  { code: 'kw', name: 'Cornish' },
  { code: 'br', name: 'Breton' },
  { code: 'gv', name: 'Manx' },
  { code: 'la', name: 'Latin' },
  { code: 'grc', name: 'Ancient Greek (Ἑλληνική)' },
  { code: 'el', name: 'Modern Greek (Ελληνικά)' },
];

const Translator: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/translate', {
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
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translator-container">
      <h1 className="translator-heading">Language Translator</h1>
      
      <div className="language-selectors">
        <div className="language-selector">
          <label htmlFor="sourceLanguage">From:</label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="language-selector">
          <label htmlFor="targetLanguage">To:</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="translation-boxes">
        <div className="translation-box">
          <label htmlFor="sourceText">Enter text:</label>
          <textarea
            id="sourceText"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type or paste text here..."
          />
        </div>

        <div className="translation-box">
          <label htmlFor="translatedText">Translation:</label>
          <textarea
            id="translatedText"
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        className="translate-button"
        onClick={handleTranslate}
        disabled={isLoading || !sourceText.trim()}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
    </div>
  );
};

export default Translator; 