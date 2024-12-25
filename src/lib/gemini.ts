import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function predictAttrition(employeeData: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following employee data and predict the likelihood of attrition. Consider factors like performance, salary, and tenure:
    ${JSON.stringify(employeeData, null, 2)}
    Provide a detailed analysis and risk level (Low, Medium, High).`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function recommendTraining(employeeData: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Based on the following employee data, recommend training and development opportunities:
    ${JSON.stringify(employeeData, null, 2)}
    Consider their role, department, and current skills. Provide specific course recommendations and development paths.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function checkCompliance(employeeData: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Review the following employee data for compliance issues:
    ${JSON.stringify(employeeData, null, 2)}
    Check for required training completion, certification validity, and any potential HR policy violations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}