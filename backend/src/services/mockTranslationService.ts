export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  error?: string;
}

// Simple mock translations for testing
const mockTranslations: Record<string, Record<string, string>> = {
  'en': {
    'es': 'Hola, esto es una traducción de prueba.',
    'fr': 'Bonjour, ceci est une traduction de test.',
    'de': 'Hallo, dies ist eine Testübersetzung.',
    'it': 'Ciao, questa è una traduzione di prova.',
    'pt': 'Olá, esta é uma tradução de teste.',
    'ru': 'Привет, это тестовый перевод.',
    'ja': 'こんにちは、これはテスト翻訳です。',
    'ko': '안녕하세요, 이것은 테스트 번역입니다。',
    'zh': '你好，这是一个测试翻译。',
    'th': 'สวัสดี นี่คือการแปลทดสอบ',
    'vi': 'Xin chào, đây là bản dịch thử nghiệm.',
    'ga': 'Dia duit, is é seo aistriúchán tástála.',
    'cy': 'Helo, dyma gyfieithiad prawf.',
    'gd': 'Halò, is e seo eadar-theangachadh deuchainn.',
    'kw': 'Dydh da, hemm yw treylyans assay.',
    'br': 'Demat, unan eo ar c\'hinnig-se.',
    'gv': 'Moghrey mie, shoh yn çhyndaa shirveishagh.',
    'la': 'Salve, haec est interpretatio experimenti.',
    'grc': 'Χαῖρε, αὕτη ἐστὶν μετάφρασις πείρας.',
    'el': 'Γεια σας, αυτή είναι μια δοκιμαστική μετάφραση.',
  },
  'es': {
    'en': 'Hello, this is a test translation.',
  },
  'fr': {
    'en': 'Hello, this is a test translation.',
  },
  'de': {
    'en': 'Hello, this is a test translation.',
  },
  'it': {
    'en': 'Hello, this is a test translation.',
  },
  'pt': {
    'en': 'Hello, this is a test translation.',
  },
  'ru': {
    'en': 'Hello, this is a test translation.',
  },
  'ja': {
    'en': 'Hello, this is a test translation.',
  },
  'ko': {
    'en': 'Hello, this is a test translation.',
  },
  'zh': {
    'en': 'Hello, this is a test translation.',
  },
  'th': {
    'en': 'Hello, this is a test translation.',
  },
  'vi': {
    'en': 'Hello, this is a test translation.',
  },
  'ga': {
    'en': 'Hello, this is a test translation.',
  },
  'cy': {
    'en': 'Hello, this is a test translation.',
  },
  'gd': {
    'en': 'Hello, this is a test translation.',
  },
  'kw': {
    'en': 'Hello, this is a test translation.',
  },
  'br': {
    'en': 'Hello, this is a test translation.',
  },
  'gv': {
    'en': 'Hello, this is a test translation.',
  },
  'la': {
    'en': 'Hello, this is a test translation.',
  },
  'grc': {
    'en': 'Hello, this is a test translation.',
  },
  'el': {
    'en': 'Hello, this is a test translation.',
  },
};

export async function mockTranslateText(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    console.log('Mock translation request:', {
      text: request.text.substring(0, 50) + (request.text.length > 50 ? '...' : ''),
      sourceLanguage: request.sourceLanguage,
      targetLanguage: request.targetLanguage
    });

    // Check if we have a mock translation for this language pair
    if (mockTranslations[request.sourceLanguage] && 
        mockTranslations[request.sourceLanguage][request.targetLanguage]) {
      
      // Return the mock translation
      return {
        translatedText: mockTranslations[request.sourceLanguage][request.targetLanguage]
      };
    } else {
      // If we don't have a mock translation, return a generic message
      return {
        translatedText: `[Mock translation from ${request.sourceLanguage} to ${request.targetLanguage}]: ${request.text}`
      };
    }
  } catch (error) {
    console.error('Mock translation error:', error);
    return {
      translatedText: '',
      error: `Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 