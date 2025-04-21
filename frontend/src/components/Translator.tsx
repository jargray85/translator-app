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
  const [sourceLanguage, setSourceLanguage] = useState<string>('en');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSourceLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Source language changed to:', e.target.value);
    setSourceLanguage(e.target.value);
  };

  const handleTargetLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Target language changed to:', e.target.value);
    setTargetLanguage(e.target.value);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sourceLanguage,
          targetLanguage,
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error occurred during translation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translator-container">
      <h1>Language Translator</h1>
      
      <div className="language-selectors">
        <div className="language-select">
          <label htmlFor="sourceLanguage">From:</label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={handleSourceLanguageChange}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="language-select">
          <label htmlFor="targetLanguage">To:</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={handleTargetLanguageChange}
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
        <div className="text-box">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
          />
        </div>

        <div className="text-box">
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
          />
        </div>
      </div>

      <button 
        className="translate-button"
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
    </div>
  );
};

export default Translator; 