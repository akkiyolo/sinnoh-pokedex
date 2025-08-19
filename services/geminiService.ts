import { GoogleGenAI } from "@google/genai";
import { Pokemon } from '../types';

// Use a singleton pattern for the AI client, initialized lazily.
// This prevents the app from crashing on startup if the API key is not available.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    } else {
      // This will be logged to the browser console for the developer.
      console.error("Gemini API key not found. Please set the API_KEY environment variable.");
    }
  }
  return ai;
}

export const generatePokedexEntry = async (pokemon: Pokemon): Promise<string> => {
  const aiClient = getAiClient();

  if (!aiClient) {
    return `Could not connect to the AI service. The API Key may be missing or invalid.`;
  }
  
  const model = 'gemini-2.5-flash';
  
  const prompt = `Generate a creative and engaging Pokédex entry for ${pokemon.name}, a ${pokemon.types.join('/')} type Pokémon. The entry should be 2-3 sentences long. Focus on its unique abilities, its habitat within the Sinnoh region, and a little-known or interesting fact about it. The tone should be like an official Pokédex entry from the games. Do not use markdown formatting.`;

  try {
    const response = await aiClient.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating Pokédex entry:", error);
    return `Could not generate a creative entry for ${pokemon.name}. It is a ${pokemon.types.join(' and ')} type Pokémon known for its distinct appearance in the Sinnoh region.`;
  }
};
