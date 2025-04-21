import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY is not set in the environment variables');
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  error?: string;
}

// Define types for OpenAI API responses
interface OpenAIErrorResponse {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

interface OpenAIChoice {
  message?: {
    content?: string;
  };
}

interface OpenAIResponse {
  choices?: OpenAIChoice[];
}

export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return {
        translatedText: '',
        error: 'OpenAI API key is not set in the environment variables'
      };
    }

    // Map language codes to full names for better prompting
    const sourceLangName = getLanguageName(request.sourceLanguage);
    const targetLangName = getLanguageName(request.targetLanguage);

    const prompt = `Translate the following text from ${sourceLangName} to ${targetLangName}. 
    Only provide the translation, no explanations or additional text:
    
    "${request.text}"`;
    
    try {
      // Use fetch API to make the request
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional translator. Provide only the translation without any explanations or additional text." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      };
      
      // Make the request using fetch API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...(process.env.OPENAI_ORG_ID ? { 'OpenAI-Organization': process.env.OPENAI_ORG_ID } : {}),
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const rawError = await response.text();
        const errorData = JSON.parse(rawError) as OpenAIErrorResponse;
        
        // Handle specific error types with clear messages
        if (errorData.error?.code === 'insufficient_quota' || errorData.error?.type === 'insufficient_quota') {
          return {
            translatedText: '',
            error: 'Your OpenAI API key has exceeded its quota. Please check your OpenAI account billing status or upgrade your plan.'
          };
        }
        
        if (errorData.error?.code === 'invalid_api_key' || errorData.error?.type === 'invalid_request_error') {
          return {
            translatedText: '',
            error: 'Invalid OpenAI API key. Please check your API key and make sure it is correctly formatted.'
          };
        }
        
        // For other errors, provide a clear message
        return {
          translatedText: '',
          error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`
        };
      }

      const data = await response.json() as OpenAIResponse;
      const translatedText = data.choices?.[0]?.message?.content?.trim() || '';
      
      return {
        translatedText
      };
    } catch (apiError) {
      // Provide a clear error message
      return {
        translatedText: '',
        error: `Failed to connect to OpenAI API: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`
      };
    }
  } catch (error) {
    return {
      translatedText: '',
      error: `Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Helper function to get full language names
function getLanguageName(code: string): string {
  const languageMap: Record<string, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'th': 'Thai',
    'vi': 'Vietnamese',
    'ga': 'Irish',
    'cy': 'Welsh',
    'gd': 'Scottish Gaelic',
    'kw': 'Cornish',
    'br': 'Breton',
    'gv': 'Manx',
    'la': 'Latin',
    'grc': 'Ancient Greek',
    'el': 'Modern Greek',
  };
  
  return languageMap[code] || code;
} 