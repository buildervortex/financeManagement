import Groq from 'groq-sdk';
import c from "config";

const fetchSuggestionsFromGroq = async (prompt: string): Promise<string> => {
  const groq = new Groq({
    apiKey: c.get("grogApiKey"),
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.2-3b-preview',
    });

    return chatCompletion.choices[0]?.message?.content || 'No suggestion available';
  } catch (error) {
    console.error('Error fetching suggestions from Groq:', error);
    return 'Error occurred while fetching suggestions';
  }
};

export default fetchSuggestionsFromGroq;