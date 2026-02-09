
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeTextForAMSTAR = async (questionText: string, snippet: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a methodology expert for systematic reviews. 
    Analyze the following snippet from a paper against this AMSTAR-2 quality criterion: "${questionText}".
    
    Paper Snippet: "${snippet}"
    
    Instructions:
    1. Determine if the criteria are met (Yes, Partial Yes, or No).
    2. Provide a short, structured justification for your choice.
    3. Quote specific parts of the snippet that support your conclusion.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestion: {
            type: Type.STRING,
            description: "Suggested rating (Yes, Partial Yes, No, or Not Applicable)",
          },
          justification: {
            type: Type.STRING,
            description: "Explanation of why this rating was chosen.",
          },
          evidence: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific quotes from the text.",
          }
        },
        required: ["suggestion", "justification", "evidence"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return null;
  }
};
