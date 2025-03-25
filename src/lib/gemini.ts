import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function generateResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Ensure correct model name

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  const response = await result.response;
  return response.text();
}

export async function predictAttrition(employeeData: any) {
  const prompt = `Analyze the following employee data and predict the likelihood of attrition. Consider factors like performance, salary, and tenure:
    ${JSON.stringify(employeeData, null, 2)}
    Provide a detailed analysis and risk level (Low, Medium, High).`;
  return generateResponse(prompt);
}

export async function recommendTraining(employeeData: any) {
  const prompt = `Based on the following employee data, recommend training and development opportunities:
    ${JSON.stringify(employeeData, null, 2)}
    Consider their role, department, and current skills. Provide specific course recommendations and development paths.`;
  return generateResponse(prompt);
}

export async function checkCompliance(employeeData: any) {
  const prompt = `Review the following employee data for compliance issues:
    ${JSON.stringify(employeeData, null, 2)}
    Check for required training completion, certification validity, and any potential HR policy violations.`;
  return generateResponse(prompt);
}
