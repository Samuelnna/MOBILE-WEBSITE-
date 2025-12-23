import { GoogleGenAI, Chat, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const createChatSession = (): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'MediBot', the virtual assistant for the Mobile Healthcare Initiative. 
      Your role is to help visitors navigate our telemedicine services, schedule appointments, and provide GENERAL wellness information.
      
      CRITICAL RULES:
      1. DO NOT provide specific medical diagnoses. If a user describes serious symptoms, URGE them to call emergency services or visit a hospital immediately.
      2. Be professional, empathetic, and concise.
      3. Our services include: Primary Care, Mental Health Consultations, Chronic Disease Management, and Specialist Referrals.
      4. If asked about pricing: "Consultations start at $49. We accept most major insurance plans."
      5. If asked to book: "Click any 'Book Appointment' button on the page or use the Contact form."
      `,
    },
  });
};

export const analyzeSymptoms = async (symptoms: string) => {
  if (!ai) throw new Error("AI not initialized");

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following symptoms and provide a structured assessment for a telemedicine triage: "${symptoms}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          assessment: {
            type: Type.STRING,
            description: "A brief, empathetic summary of the reported symptoms."
          },
          urgency: {
            type: Type.STRING,
            description: "One of: LOW, MEDIUM, HIGH, EMERGENCY"
          },
          recommendedService: {
            type: Type.STRING,
            description: "The most relevant service from: Primary Care, Urgent Care, Mental Health, Specialist"
          },
          disclaimer: {
            type: Type.STRING,
            description: "A mandatory medical disclaimer."
          }
        },
        required: ["assessment", "urgency", "recommendedService", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const sendMessageToGemini = async (chat: Chat, message: string) => {
  return await chat.sendMessageStream({ message });
};