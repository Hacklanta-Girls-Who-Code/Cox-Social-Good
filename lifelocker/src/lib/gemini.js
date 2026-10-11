// Code retrieved from J'adore's gemini branch
import { GoogleGenAI, Type } from "@google/genai";

// Function to have convert a file object into the base64 format that Gemini expects.
const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
  // Create a new FileReader instance
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve ({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type
        },
      });
    };
    reader.onerror = reject;
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};

// Function to process said base 64 file, have Gemini derive the text from it, 
// compile it in a .json format, and return it to the user.
export const analyzeDocumentImage = async (file) => {
  try {
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not configured.');
    }

    const geminiClient = new GoogleGenAI({ apiKey });

    // Define our JSON Schema structure for the specific output we want from Gemini.
    const jsonSchema = {
      type: Type.OBJECT,
      properties: {
        docTitle: { 
          type: Type.STRING,
          description: "The title of the document.",
        },
        fullName: {
          type: Type.STRING,
          description: "The full legal name of the individual on the document.",
        },
        dateOfBirth: {
          type: Type.STRING,
          description: "The individual's Date of Birth converted into DD-MM-YYYY format.",
        },
        documentType: {
          type: Type.STRING,
          description: "The type of document provided (e.g., Passport, Driver's License, etc.).",
        },
      },
      required: ["docTitle", "fullName", "dateOfBirth", "documentType"],
    };

    const imageInput = await fileToGenerativePart(file);
    const prompt = 'Analyze this document image. Carefully extract the following details: Document Title, individual\'s Full Name, their Date of Birth (in DD-MM-YYYY format), and the specific Document Type.';
    
    const result = await geminiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [prompt, imageInput],
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });
    const responseText = result.text;
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    return JSON.parse(responseText);
    
  } catch (error) {
    console.error("Error extracting document details:", error);
    throw error;
  }
};