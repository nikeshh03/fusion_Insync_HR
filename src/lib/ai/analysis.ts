import { model } from './config';
import { PROMPTS } from './prompts';

async function generateAnalysis(prompt: string) {
  if (!prompt) {
    throw new Error('Analysis prompt is required');
  }

  try {
    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error('AI Analysis error:', error.message);
      throw new Error(`Analysis failed: ${error.message}`);
    }
    console.error('AI Analysis error:', error);
    throw new Error('Failed to generate analysis. Please check your API key and try again.');
  }
}

export async function predictAttrition(employeeData: any) {
  if (!employeeData) {
    throw new Error('Employee data is required for attrition prediction');
  }
  return generateAnalysis(PROMPTS.attrition(employeeData));
}

export async function recommendTraining(employeeData: any) {
  if (!employeeData) {
    throw new Error('Employee data is required for training recommendations');
  }
  return generateAnalysis(PROMPTS.training(employeeData));
}

export async function checkCompliance(employeeData: any) {
  if (!employeeData) {
    throw new Error('Employee data is required for compliance check');
  }
  return generateAnalysis(PROMPTS.compliance(employeeData));
}

export async function analyzeAttritionData(data: any) {
  if (!data) {
    throw new Error('Attrition data is required for analysis');
  }
  return generateAnalysis(PROMPTS.attritionAnalysis(data));
}