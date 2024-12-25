import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key') {
  throw new Error(
    'Invalid or missing Gemini API key. Please add a valid VITE_GEMINI_API_KEY to your .env file'
  );
}

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });