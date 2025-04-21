import { Request, Response } from 'express';
import { translateText as translateTextService, TranslationResponse } from '../services/translationService';

export async function handleTranslate(req: Request, res: Response): Promise<void> {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;

    if (!text || !sourceLanguage || !targetLanguage) {
      res.status(400).json({
        error: 'Missing required fields: text, sourceLanguage, and targetLanguage are required'
      });
      return;
    }

    const result: TranslationResponse = await translateTextService({
      text,
      sourceLanguage,
      targetLanguage
    });

    if (result.error) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json({ translatedText: result.translatedText });
  } catch (error) {
    res.status(500).json({
      error: `Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
} 