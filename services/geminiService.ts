
import { GoogleGenAI } from "@google/genai";
import { Pokemon } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePokedexEntry = async (pokemon: Pokemon): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `Generate a creative and engaging Pokédex entry for ${pokemon.name}, a ${pokemon.types.join('/')} type Pokémon. The entry should be 2-3 sentences long. Focus on its unique abilities, its habitat within the Sinnoh region, and a little-known or interesting fact about it. The tone should be like an official Pokédex entry from the games. Do not use markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
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
